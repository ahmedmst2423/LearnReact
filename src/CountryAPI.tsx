import React, { useEffect, useState } from "react";

const APICountry = () => {
  const [apiCountry, setAPICountry] = useState<any[]>([]);
  const [apiCountryId, setAPICountryId] = useState<number>(0);
  const [apiDisplayCities, setAPIDisplayCities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [filterChange, setFilterChange] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.eatachi.co/api/country`)
      .then((response) => response.json())
      .then((data) => {
        setAPICountry(data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (apiCountryId > 0) {
      setLoadingCities(true); // Set loading state for cities
      fetch(`https://api.eatachi.co/api/city/bycountry/${apiCountryId}`)
        .then((response) => response.json())
        .then((data) => {
          setAPIDisplayCities(data);
          setLoadingCities(false); // Stop loading after data is fetched
        })
        .catch((err) => {
          alert(err);
          setLoadingCities(false); // Stop loading in case of error
        });
    } else {
      // Clear cities when no valid country is selected
      setAPIDisplayCities([]);
    }
  }, [apiCountryId]);

  const onChangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const countryId = Number(value);
    setAPICountryId(countryId);
  };

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterChange(e.target.value.toLowerCase()); // Set filter to lowercase for case-insensitive matching
  };

  // Filter cities based on the filter input
  const filteredCities = apiDisplayCities.filter((city: any) =>
    city.Name.toLowerCase().startsWith(filterChange)
  );

  return (
    <div style={{ width: "50%", backgroundColor: "blue", padding: "20px" }}>
      <div>API Section</div>
      <div style={{ margin: "10px" }}>
        <select onChange={onChangeCountry} value={apiCountryId}>
          <option value={0}>{`{select country}`}</option>
          {apiCountry.map((c: any) => (
            <option key={c.CountryId} value={c.CountryId}>
              {c.Name}
            </option>
          ))}
        </select>
      </div>

      {/* Conditional rendering for loader */}
      {loading ? (
        <div style={{ color: "white" }}>Loading countries...</div>
      ) : (
        <div style={{ margin: "10px" }}>
          {loadingCities ? (
            <div style={{ color: "white" }}>Loading cities...</div>
          ) : apiDisplayCities.length === 0 && apiCountryId !== 0 ? (
            <div style={{ color: "white" }}>No Cities Found</div>
          ) : (
            <>
              {/* Filter input */}
              <input
                type="text"
                placeholder="Filter cities..."
                onChange={onFilterChange}
                value={filterChange}
                style={{ marginBottom: "10px", padding: "5px" }}
              />
              
              {/* Filtered list of cities */}
              <ul>
                {filteredCities.map((c: any) => (
                  <li key={c.CityId}>{c.Name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default APICountry;
