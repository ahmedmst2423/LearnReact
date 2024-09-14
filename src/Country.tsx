import React, { useState, useEffect } from 'react';

const Country = () => {
    const countries = [
        { id: 1, name: "PAKISTAN" },
        { id: 2, name: "USA" }
    ];

    const cities = [
        { countryid: 1, cityid: 1, name: "Karachi" },
        { countryid: 1, cityid: 2, name: "Lahore" },
        { countryid: 2, cityid: 3, name: "Florida" },
        { countryid: 2, cityid: 4, name: "California" }
    ];

    // State to store the selected country and filtered cities
    const [selectedCountryId, setSelectedCountry] = useState<number | null>(null);
    const [displayCities, setDisplayCities] = useState<{ cityid: number, name: string }[]>([]);
    const [countryApi, setCountryApi] = useState<any[]>([]); // Change the initial state to an empty array

    // Effect to filter cities based on selected country
    useEffect(() => {
        if (selectedCountryId !== null) {
            const filtered = cities.filter(city => city.countryid === selectedCountryId);
            setDisplayCities(filtered);
        }
    }, [selectedCountryId, cities]); // Added 'cities' to the dependency array

    // Effect to fetch country data
    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries/capital/')
            .then((response) => response.json())
            .then((data) => setCountryApi(data.data)) // Assign only the `data` part of the API response
            .catch((err) => {
                console.error("Error fetching country data:", err);
                alert("Error fetching country data");
            });
    }, []); // Empty dependency array to fetch data only on component mount

    // Handler for country selection change
    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const countryId = parseInt(event.target.value, 10);
        setSelectedCountry(countryId);
    };

    return (
        <div style={{ width: "50%", backgroundColor: "green" }}>
            <h5>Hardcoded Section</h5>
            <select onChange={handleCountryChange} value={selectedCountryId ?? ''}>
                <option value="">Select a country</option>
                {countries.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>
            
           
                <div>
                    
                    <ul>
                        {displayCities.map(city => (
                            <li key={city.cityid}>{city.name}</li>
                        ))}
                    </ul>
                </div>
     
        </div>
    );
};

export default Country;