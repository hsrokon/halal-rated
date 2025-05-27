import { useEffect, useState } from "react";
import { IoIosLink } from "react-icons/io";

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
    fetch("https://restcountries.com/v3.1/all")
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

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ region, country, city });
  };

  return (
    <div className="font-poppins mt-4 w-11/12 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-semibold text-center">Add Trusted Halal Spots</h1>
      <h2 className="text-xl text-center mt-1 text-primary italic">
        Help the Ummah discover authentic Rizq.
      </h2>

      <form onSubmit={handleSubmit} className="my-14 space-y-8 px-4">

        {/*---------- shop region and location */}
        <div className="flex flex-col gap-2 lg:gap-6 lg:flex-row lg:justify-around lg:items-end">
          {/* Region */}
          <div className="w-full md:w-2/4 md:mx-auto lg:mx-0 lg:w-1/3">
            <label className="label">
              <span className="label-text text-primary">&#10095; Select Region</span>
            </label>
            <select
              className="select select-bordered w-full border-2 border-primary rounded"
              value={region}
              required
              onChange={(e) => setRegion(e.target.value)}
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

        {/*--------shop Name location and rating */}
        <div className="flex flex-col lg:flex-row justify-between">
          <label className="label flex-col items-start w-full
          md:w-2/4 lg:w-full mx-auto">
            <span className="label-text text-primary">
            &#10095;  Shop Name
            </span>
            
            <input type="text" 
            name="shop-name" 
            required
            placeholder="E.g. Al-Noor Halal Store" 
            className="input input-bordered border-2 border-primary rounded lg:w-xs 
            placeholder:text-gray-500"/>
          </label>

          <label className="label flex-col items-start w-full
          md:w-2/4 lg:w-full mx-auto">
            <span className="label-text text-primary">
            &#10095;  Shop Specific Location
            </span>
            
            <input type="text" 
            name="shop-specific-location" 
            required
            placeholder="E.g. 103 Prince Street, New York, NY 10012" 
            className="input input-bordered border-2 border-primary rounded lg:w-xs
            placeholder:text-gray-500"/>
          </label>
          
          <label className="label flex-col items-start w-full
          md:w-2/4 md:mx-auto lg:mx-0 lg:w-auto ">
            <span className="label-text text-primary">
            &#10095;  Rating
            </span>
            
            <div className="rating">
              <input 
              type="radio" 
              name="rating"
              required
              className="mask mask-star-2 bg-green-700"  />
              <input 
              type="radio" 
              name="rating"
              className="mask mask-star-2 bg-green-700"  />
              <input 
              type="radio" 
              name="rating"
              className="mask mask-star-2 bg-green-700"  />
              <input 
              type="radio" 
              name="rating"
              className="mask mask-star-2 bg-green-700"  />
              <input 
              type="radio" 
              name="rating"
              className="mask mask-star-2 bg-green-700"  /> 
            </div>
          </label>
        </div>

        {/*----- shop review  */}
        <div>
          <label className="label flex flex-col">
            <span className="label-text text-primary">&#10095; Your Review</span>
            
            <textarea 
            name="review-area"
            required
            className="text-area w-full md:w-1/2 md:h-40 h-32 text-sm lg:text-base lg:w-96 lg:h-52 rounded border-2 border-primary p-2 placeholder:text-gray-600 text-base-content"
            placeholder="Write your review. We trust you..."
            ></textarea>
          </label>
        </div>


        <div className="flex flex-col lg:flex-row gap-6 lg:gap-20 my-8">
          {/* -------Halal certified? */}
          <div className="flex flex-col items-center gap-2">
                <label className="label">
                  <span className="label-text text-primary">&#10095; Did the store display halal certification?</span>
                </label>
                <label className="label cursor-pointer ml-8">
                  <span className="label-text text-primary">Yes</span>
                  <input 
                  type="radio" name="halalCertified"
                  value="Yes" 
                  className="radio checked:bg-green-600 ml-2 border-2" />
                </label>
                <label className="label cursor-pointer ml-8">
                  <span className="label-text text-primary">No</span>
                  <input 
                  type="radio" name="halalCertified"
                  value="No" 
                  className="radio checked:bg-gray-500 ml-3 border-2" />
                </label>
          </div>

          {/* ------tags  */}
          <div className="flex flex-col lg:flex-row items-start md:items-center lg:items-start">
            <label className="label">
                  <span className="label-text text-primary">&#10095; What stood out to you?</span>
            </label>
            <div className="flex flex-col gap-2 text-sm md:text-base">
              <label className="label cursor-pointer ml-8">
                    <input 
                    type="checkbox"
                    name="halalCertified"
                    value="Yes" 
                    className="checkbox checkbox-success mr-2 border-2" />
                    <span className="label-text text-primary">Clean Environment</span>
              </label>
              <label className="label cursor-pointer ml-8">
                    <input 
                    type="checkbox"
                    name="halalCertified"
                    value="Yes" 
                    className="checkbox checkbox-success mr-2 border-2" />
                    <span className="label-text text-primary">Zabiha/Halal Verified</span>
              </label>
              <label className="label cursor-pointer ml-8">
                    <input 
                    type="checkbox"
                    name="halalCertified"
                    value="Yes" 
                    className="checkbox checkbox-success mr-2 border-2" />
                    <span className="label-text text-primary">Affordable Prices</span>
              </label>
              <label className="label cursor-pointer ml-8">
                    <input 
                    type="checkbox"
                    name="halalCertified"
                    value="Yes" 
                    className="checkbox checkbox-success mr-2 border-2" />
                    <span className="label-text text-primary">Friendly Staff</span>
              </label>
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
          <label className="label cursor-pointer ml-8">
                <input 
                type="checkbox"
                required
                value="Yes" 
                className="checkbox checkbox-success mr-2 border-2" />
                <span className="label-text text-primary font-semibold text-wrap text-sm md:text-base">I confirm that my review is honest and based on my actual experience.</span>
            </label>
          <label className="label cursor-pointer ml-8">
                <input 
                type="checkbox"
                required
                value="Yes" 
                className="checkbox checkbox-success mr-2 border-2" />
                <span className="label-text text-primary font-semibold text-wrap text-sm md:text-base">I allow my name or profile or both info to be shown with this review.</span>
            </label>
        </div>

        {/* ----submit  */}
        <div className="flex justify-center my-10">
          <button className="btn bg-secondary text-white hover:bg-primary rounded px-10 py-6 text-base">Submit Review</button>
        </div>
      </form>
    </div>
  );
};

export default AddReviews;
