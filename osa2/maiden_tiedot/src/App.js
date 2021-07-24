import { useState, useEffect } from "react";
import axios from "axios";

const CountryDetails = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img height="200px" src={country.flag} alt="country flag" />
      {weather && weather.data && weather.data.current && (
        <div>
          <h2>Weather in {country.name}</h2>
          <p>temperature: {weather.data.current.temperature} celsius</p>
          <p>
            wind: {weather.data.current.wind_speed}
            {weather.data.current.wind_dir}
            {weather.data.current.wind_degree}
          </p>
        </div>
      )}
    </div>
  );
};

const CountryList = ({ countries, setSelectedCountry }) =>
  countries.map((country) => (
    <div key={country.name}>
      {country.name}
      <button onClick={() => setSelectedCountry(country)}>show</button>
    </div>
  ));

const CountryData = ({
  countries,
  setSelectedCountry,
  selectedCountry,
  weather,
  errorMsg,
}) => {
  if (selectedCountry && selectedCountry.name)
    return <CountryDetails country={selectedCountry} weather={weather} />;
  if (errorMsg) return <p>{errorMsg}</p>;
  if (countries.length > 1)
    return (
      <CountryList
        countries={countries}
        setSelectedCountry={setSelectedCountry}
      />
    );
  return <p>Search countries</p>;
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [weather, setWeather] = useState({});
  const [filter, setFilter] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setSelectedCountry({});
    fetchCountries();
    fetchWeather();
  }, [filter]);

  const fetchWeather = async () => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: selectedCountry.capital,
    };
    const result = await axios.get("http://api.weatherstack.com/current", {
      params,
    });
    setWeather(result);
  };

  const fetchCountries = async () => {
    try {
      const result = await axios.get(
        `https://restcountries.eu/rest/v2/name/${filter}`
      );
      if (result.data.length === 1) setSelectedCountry(result.data[0]);
      if (result.data.length > 10) {
        return setErrorMsg("Too many matches, specify another filter");
      }
      setErrorMsg("");
      setCountries(result.data);
    } catch (err) {
      setCountries([]);
      if (filter.length) return setErrorMsg("No countries found");
      setErrorMsg("");
    }
  };

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <CountryData
        countries={countries}
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
        weather={weather}
        errorMsg={errorMsg}
      />
    </div>
  );
};

export default App;
