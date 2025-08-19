import { useEffect, useState } from "react";
import { IoIosLink } from "react-icons/io";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const AddReviews = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");

  // Fetched all countries from REST Countries
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,region")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountriesData(sorted);//setting all countries data

        const uniqueRegions = [...new Set(sorted.map(c => c.region).filter(Boolean))];//extracting regions from countries
        //new Set(...) → Removes duplicates because Set only keeps unique values.
        //[...new Set(...)] → Converts the Set back into an array using the spread operator (...).

        setRegions(uniqueRegions);
      });
  }, []);

  // Filtered countries by selected region
  useEffect(() => {
    const filtered = countriesData.filter(c => c.region === region);
    setFilteredCountries(filtered);//setting countries by region
    setCountry("");
    setCities([]);
    setCity("");
  }, [region, countriesData]);

  // Fetched cities from CountriesNow when a country is selected
  useEffect(() => {
    if (!country) return;

    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error || !data.data) {
          setCities([]);
        } else {
          setCities(data.data);
        }
        setCity("");
      })
      .catch(() => setCities([]));
  }, [country]);

  const [ draftData, setDraftData ] = useState(null);
  const [pendingCountry, setPendingCountry] = useState('');
  const [pendingCity, setPendingCity] = useState('');
  //place naming
  const [ placeType, setPlaceType ] = useState("");
  const formatDisplayType = (placeType, isStartOfSentence = false) => {
  if (!placeType) return isStartOfSentence ? "Place" : "place";
  if (placeType === "Others") return isStartOfSentence ? "Establishment" : "establishment";

  // Capitalize if it's the start of a sentence
  return isStartOfSentence
    ? placeType.charAt(0).toUpperCase() + placeType.slice(1)
    : placeType.toLowerCase();
  };
  const displayType = formatDisplayType(placeType);
  const displayTypeCapital = formatDisplayType(placeType, true);


  //getting existing shop
  const [ existingShops, setExistingShops ] = useState([]);
  const [ useExistingShop, setUseExistingShop ] = useState(true);
  const [ selectedPlaceId, setSelectedPlaceId ] = useState('');
  const [ selectedPlaceName, setSelectedPlaceName ] = useState('');
  const [ selectedPlaceSpecificLocation, setSelectedPlaceSpecificLocation ] = useState('');

  useEffect(()=>{
    if (region && country && city) {
      fetch(`http://localhost:5000/places?region=${region}&country=${country}&city=${city}`)
      .then(res => res.json())
      .then(data => setExistingShops(data))
    }
  },[region, country, city])


  //session storage for draft data
  useEffect(()=>{
    const draft = sessionStorage.getItem('pendingReview');
    if (draft) {
      const data = JSON.parse(draft);

      //step by step region country set
      setRegion(data.region || '');
      setPendingCountry(data.country || '');
      setPendingCity(data.city || '');
      //other fields
      setRating(data.rating || null);
      setHalalCertified(data.halalCertified || false);
      setHonestyConsent(data.honestyConsent || false);
      setUserDisplay(data.userDisplay || false);
      setSelectedTags(data.selectedTags || []);
      setPlaceType(data.placeType || "");

      setDraftData(data);
    }
  },[])

  useEffect(()=> {
    if (pendingCountry && filteredCountries.length > 0) {
      const found = filteredCountries.find(c=> c.name.common === pendingCountry);
      if (found) {
        setCountry(pendingCountry);
        setPendingCountry('');
      }
    }
  },[filteredCountries, pendingCountry]);

  useEffect(()=> {
    if (pendingCity && cities.length > 0) {
      if (cities.includes(pendingCity)) {
        setCity(pendingCity);
        setPendingCity('');
      }
    }
  },[cities, pendingCity]);


  //for form clearing
  const resetFormState = () => {
  setRegion('');
  setCountry('');
  setCity('');
  setRating(0);
  setPlaceType("");
  setHalalCertified(false);
  setHonestyConsent(false);
  setUserDisplay(false);
  setSelectedTags([]);
  };


  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [ rating, setRating ] = useState(0);
  const [ halalCertified, setHalalCertified ] = useState(false);
  const [ honestyConsent, setHonestyConsent ] = useState(false);
  const [ userDisplay, setUserDisplay ] = useState(false);
  const [ selectedTags, setSelectedTags ] = useState([]);

  const axiosSecure = useAxiosSecure();

  // Form Submit
  const handleSubmit = e => {
    e.preventDefault();
    
    //!user redirect to login and save draft form data
    if (!user) {
      const form = e.target;
      const saveReviewDraft = {
        placeName : form.placeName.value,
        placeSpecificLocation : form.placeSpecificLocation.value,
        reviewArea : form.reviewArea.value,
        selectedTags : Array.from(form.tags)
              .filter(input => input.checked)
              .map(input => input.value),
        photoURL : form.photoURL.value,
        region,
        country,
        city,
        rating,
        placeType,
        halalCertified,
        honestyConsent,
        userDisplay,
      }

      sessionStorage.setItem('pendingReview', JSON.stringify(saveReviewDraft));

      //login redirect
      navigate('/auth/login', {
        state: location.pathname,
      })
      return;
    }

    const form = e.target;
    const placeName = form.placeName.value;
    const placeSpecificLocation = form.placeSpecificLocation.value;
    const reviewArea = form.reviewArea.value;
    const selectedTags = Array.from(form.tags)
          .filter(input => input.checked)
          .map(input => input.value);
    const photoURL = form.photoURL.value;
    const userEmail = user.email;

    const placeData = {
      region,
      country,
      city,
      placeName,
      placeSpecificLocation,
      selectedPlaceId,
      placeType,
      halalCertified,
      selectedTags,
      photoURL,
      enlisterEmail : userEmail,
    }

    const reviewData = {
      rating,
      reviewArea,
      honestyConsent,
      photoURL,
      selectedTags,
      userDisplay,
      userEmail,
    }
    
    Swal.fire({
      title: "Do you want to submit?",
      text: "After posting you can anytime edit this review from your profile!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, post it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(userReviewData);

        //for server fetch
        axiosSecure.post('/places', placeData)
        .then(res => {
          // console.log(res.data);
          if (res.data.modifiedCount) {
            
            axiosSecure.post('/addReviews', reviewData)
            .then(res => {
              if (res.data.insertedId) {
                Swal.fire({
                title: "Posted!",
                text: "Your review has been posted.",
                icon: "success"
                });

                //resetting
                sessionStorage.removeItem('pendingReview');
                form.reset();
                resetFormState();
                form.placeName.value = '';
                form.placeSpecificLocation.value = '';
                form.reviewArea.value = '';
                form.photoURL.value = '';
                navigate('/');
              }
            })
          }
        })
      }
    });
  };


  return (
    <div className="font-poppins mt-4 w-11/12 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-semibold text-center">Add Trusted Halal Spots</h1>
      <h2 className="text-xl text-center mt-1 text-primary italic">
        Help the Ummah discover authentic Rizq.
      </h2>

      <form onSubmit={handleSubmit} className="my-14 space-y-8 px-4">

        {/*---------- place region and location */}
        <div className="flex flex-col gap-2 lg:gap-6 lg:flex-row lg:justify-around lg:items-end">

          {/* Region */}
          <div className="w-full md:w-2/4 md:mx-auto lg:mx-0 lg:w-1/3">

            <label className="label">
              <span className="label-text text-primary">&#10095; Select Region</span>
            </label>
            <select
              className="select select-bordered w-full border-2 border-primary rounded"
              value={region}
              defaultValue={draftData?.region}
              required
              onChange={e => setRegion(e.target.value)}
            >
              <option value="" disabled>
                Choose a region
              </option>
              {regions.map((reg, idx) => (
                <option key={idx} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          {/* Country */}
          <div className="w-full md:w-2/4 md:mx-auto lg:mx-0 lg:w-1/3">
            <label className="label">
              <span className="label-text text-primary">&#10095; Select Country</span>
            </label>
            <select
              className="select select-bordered w-full border-2 border-primary rounded"
              value={country}
              defaultValue={draftData?.country}
              required
              onChange={(e) => setCountry(e.target.value)}
              disabled={!region}
            >
              <option value="" disabled>
                {region ? "Choose a country" : "Select region first"}
              </option>
              {filteredCountries.map((c, idx) => (
                <option key={idx} value={c.name.common}>
                  {c.name.common}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div className="w-full md:w-2/4 md:mx-auto lg:mx-0 lg:w-1/3">
            <label className="label">
              <span className="label-text text-primary">&#10095; Select City</span>
            </label>
            <select
              className="select select-bordered w-full border-2 border-primary rounded"
              value={city}
              defaultValue={draftData?.city}
              required
              onChange={(e) => setCity(e.target.value)}
              disabled={!cities.length}
            >
              <option value="" disabled>
                {cities.length ? "Choose a city" : "No cities found"}
              </option>
              {cities.map((cty, idx) => (
                <option key={idx} value={cty}>
                  {cty}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
              <label className="label">
                <span className="label-text text-primary">&#10095; What type of place is it?</span>
              </label>
              <div className="flex flex-col items-end gap-2">
                {['Shop', 'Restaurant', 'Cafe', 'Butcher', 'Others'].map((type) => (
                <label key={type} className="label cursor-pointer ml-8">
                  <span className="label-text text-primary">{type}</span>
                  <input
                    type="radio"
                    name="placeType"
                    required
                    value={type}
                    checked={placeType === type}
                    onChange={() => setPlaceType(type)}
                    className="radio checked:bg-green-600 ml-2 border-2"
                  />
                </label>
                ))}
              </div>
              
        </div>

        {existingShops.length > 0 && (
          <div className="flex flex-col lg:inline-block items-center md:w-1/2 mx-auto">
            <label className="label text-primary">&#10095; Select Existing Place or Add New</label>

            <select
              className="select select-bordered w-full border-2 rounded border-primary"
              disabled={!useExistingShop}
              defaultValue={`${draftData?.placeName} - ${draftData?.placeSpecificLocation}`}
              onChange={e => {
                const selected = existingShops.find(
                  s => `${s.placeName} - ${s.placeSpecificLocation}` === e.target.value
                );
                setSelectedPlaceId(selected?._id || "");
                setSelectedPlaceName(selected?.placeName || "");
                setSelectedPlaceSpecificLocation(selected?.placeSpecificLocation || "");
              }}
            >
              <option value="">Select a place</option>
              {existingShops.map((shop, idx) => (
                <option key={idx} value={`${shop.placeName} - ${shop.placeSpecificLocation}`}>
                  {shop.placeName} - {shop.placeSpecificLocation}
                </option>
              ))}
            </select>


            <label className="label cursor-pointer mt-2">
              <input
                type="checkbox"
                checked={!useExistingShop}
                onChange={(e) => setUseExistingShop(!useExistingShop)}
                className="checkbox checkbox-success border-2 mr-2"
              />
              <span className="label-text text-primary">Add a new place instead</span>
            </label>
          </div>
        )}


        {/*--------place Name location and rating */}
        <div className="flex flex-col lg:flex-row justify-between">
          <label className="label flex-col items-start w-full
          md:w-2/4 lg:w-full mx-auto">
            <span className="label-text text-primary">
            &#10095;  {displayTypeCapital} Name 
            </span>
            
            <input type="text" 
            name="placeName" 
            defaultValue={ selectedPlaceName || draftData?.placeName }
            required
            disabled={existingShops.length > 0 && useExistingShop}
            placeholder={`E.g. Al-Noor Halal ${displayTypeCapital}`} 
            className="input input-bordered border-2 border-primary rounded lg:w-xs text-base-content
            placeholder:text-gray-500"/>
          </label>

          <label className="label flex-col items-start w-full
          md:w-2/4 lg:w-full mx-auto">
            <span className="label-text text-primary">
            &#10095;  {displayTypeCapital} Specific Location
            </span>
            
            <input type="text" 
            name="placeSpecificLocation" 
            defaultValue={selectedPlaceSpecificLocation || draftData?.placeSpecificLocation}
            required
            disabled={existingShops.length > 0 && useExistingShop}
            placeholder="E.g. 103 Prince Street, New York, NY 10012" 
            className="input input-bordered border-2 border-primary rounded lg:w-xs text-base-content
            placeholder:text-gray-500"/>
          </label>
          
          <label className="label flex-col items-start w-full
          md:w-2/4 md:mx-auto lg:mx-0 lg:w-auto ">
            <span className="label-text text-primary">
            &#10095;  Rating
            </span>
            
            <div className="rating">
              {[1, 2, 3, 4, 5].map(num => (
                <input 
                key={num}
                type="radio"
                name="rating"
                required
                value={num}
                checked={rating===num}
                onChange={e => setRating(Number(e.target.value))}
                className="mask mask-star-2 bg-green-700"
                />
              ))}
            </div>
          </label>
        </div>

        {/*----- place review  */}
        <div className="">
          <label className="label flex flex-col">
            <span className="label-text text-primary">&#10095; Your Review</span>
            
            <textarea 
            name="reviewArea"
            defaultValue={draftData?.reviewArea}
            required
            className="text-area w-full md:w-1/2 md:h-40 h-32 text-sm lg:text-base lg:w-96 lg:h-52 rounded border-2 border-primary p-2 placeholder:text-gray-600 text-base-content"
            placeholder="Write your review. We trust you..."
            ></textarea>
          </label>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-20 my-8">
          {/* -------Halal certified?*/}
          <div className="flex flex-col items-center gap-2">
                <label className="label">
                  <span className="label-text text-primary">&#10095; Did the {displayType} display halal certification?</span>
                </label>
                <label className="label cursor-pointer ml-8">
                  <span className="label-text text-primary">Yes</span>
                  <input 
                  type="radio" name="halalCertified"
                  value="Yes" 
                  checked={halalCertified===true}
                  onChange={()=> setHalalCertified(true)}
                  className="radio checked:bg-green-600 ml-2 border-2" />
                </label>
                <label className="label cursor-pointer ml-8">
                  <span className="label-text text-primary">No</span>
                  <input 
                  type="radio" name="halalCertified"
                  value="No" 
                  checked={halalCertified===false}
                  onChange={()=> setHalalCertified(false)}
                  className="radio checked:bg-gray-500 ml-3 border-2" />
                </label>
          </div>

          {/* ------tags  */}
          <div className="flex flex-col lg:flex-row items-start md:items-center lg:items-start">
            <label className="label">
                  <span className="label-text text-primary">&#10095; What stood out to you?</span>
            </label>
            <div className="flex flex-col gap-2 text-sm md:text-base">
              {['Clean Environment', 'Zabiha Verified', 'Affordable Prices', 'Friendly Staff'].map((tag, idx)=> (
                <label 
                key={idx} 
                className="label cursor-pointer ml-8">
                  <input 
                  type="checkbox" 
                  name="tags"
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={e => {
                    const isChecked = e.target.checked;
                    setSelectedTags(prev => 
                      isChecked? [...prev, tag] : prev.filter(t => t!== tag)
                    );
                  }}
                  className="checkbox checkbox-success mr-2 border-2"
                  />
                  <span className="label-text text-primary">{tag}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ------photo upload */}
        <div className="flex flex-col md:w-1/2 md:mx-auto">
          <label className="label">
                  <span className="label-text text-primary">&#10095; Upload Photo Link <span className="font-semibold italic text-xs lg:text-sm">(Highly recommended)</span></span>
          </label>
          <label className="input validator border-2 border-primary rounded">
            <IoIosLink className="text-xl" />
            <input
              type="url"
              required
              name="photoURL"
              defaultValue={draftData?.photoURL}
              placeholder="https://"
              pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
              title="Must be valid URL"
              className="w-full"
            />
          </label>
          <p className="validator-hint">Must be valid URL</p>
        </div>
        
        {/* ------consent */}
        <div className="flex flex-col gap-4">
          <h3 className="text-primary">&#10095; Final Consent</h3>
          <div className="label cursor-pointer ml-8">
                <input 
                type="checkbox"
                id="userDisplay"
                onChange={e => setHonestyConsent(e.target.checked)}
                checked={honestyConsent}
                required
                value="Yes" 
                className="checkbox checkbox-success mr-2 border-2" />
                <span className="label-text text-primary font-semibold text-wrap text-sm md:text-base">I confirm that my review is honest and based on my actual experience.</span>
            </div>
          <div className="label cursor-pointer ml-8">
                <input 
                type="checkbox"
                id="consent"
                // required
                value="Yes" 
                onChange={e => setUserDisplay(e.target.checked)}
                checked={userDisplay}
                className="checkbox checkbox-success mr-2 border-2" />
                <span className="label-text text-primary font-semibold text-wrap text-sm md:text-base">I allow my name or profile or both info to be shown with this review.</span>
          </div>
        </div>

        {/* ----submit  */}
        <div className="flex justify-center my-10">
          <button 
          type="submit" 
          disabled={!honestyConsent}
          className={`btn ${!honestyConsent ? 'border-2 border-primary' : 'text-white bg-primary'}  rounded px-10 py-6 text-base`}>Submit Review</button>
        </div>
      </form>
    </div>
  );
};

export default AddReviews;


// For further improvements in near future Insha Allah
// import { formatDistanceToNow } from 'date-fns';

// const agoText = formatDistanceToNow(new Date(review.createdAt), { addSuffix: true });
// // Output: "3 days ago"

// | Feature                 | Benefit                                |
// | ----------------------- | -------------------------------------- |
// | ⏱ `createdAt` timestamp | Enables "posted X time ago", sorting   |
// | 🔍 Review filtering     | By city, tag, rating, halal certified  |
// | 🧠 Intelligent defaults | Autofill region/country from user IP   |
// | 🖼 Image preview        | Show preview of photo URL              |
// | ✏️ Edit reviews         | Add a user panel with editable history |
// | 📊 Review stats         | Avg rating, tag frequency, total count |
// | 🧾 Review summaries     | Tag clouds, most common words          |
