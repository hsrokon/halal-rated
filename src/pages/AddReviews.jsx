import { useEffect, useState } from "react";

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
    <div className="font-poppins mt-4 w-11/12 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center">Add Trusted Halal Spots</h1>
      <h2 className="text-xl text-center mt-1 text-primary italic">
        Help the Ummah discover authentic Rizq.
      </h2>

      <form onSubmit={handleSubmit} className="my-10 space-y-6 px-4">
        <div className="flex flex-col gap-2 lg:gap-6 lg:flex-row lg:justify-around lg:items-end">
          {/* Region */}
          <div className="w-full md:w-2/4 md:mx-auto lg:mx-0 lg:w-1/3">
            <label className="label">
              <span className="label-text">&#10095; Select Region</span>
            </label>
            <select
              className="select select-bordered w-full border-2 border-primary rounded"
              value={region}
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
              <span className="label-text">&#10095; Select Country</span>
            </label>
            <select
              className="select select-bordered w-full border-2 border-primary rounded"
              value={country}
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
              <span className="label-text">&#10095; Select City</span>
            </label>
            <select
              className="select select-bordered w-full border-2 border-primary rounded"
              value={city}
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
      </form>
    </div>
  );
};

export default AddReviews;
