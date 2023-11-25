import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const apikey = "24ba76b5a0662e4bc8664ef631e822fb";
  const [getData, setData] = useState(null);
  const [getCity, setCity] = useState("London");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${getCity}&APPID=${apikey}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, [getCity]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="container">
      <div className="weather__header">
        <form className="weather__search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a city..."
            className="weather__searchform"
            value={getCity}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="weather__searchbutton">
            Search
          </button>
        </form>
      </div>
      {getData && getData.name && getData.weather && getData.main && (
        <div className="weather__body">
          <h1 className="weather__city">
            {getData.name}, {getData.sys.country}
          </h1>
          {getData.weather.map((weatherData, i) => (
            <div key={i} className="weather__datetime">
              {weatherData.main}
            </div>
          ))}
          <p className="weather__temperature">{getData.main.temp}</p>
          <div className="weather__minmax">
            <p>Min: {getData.main.temp_min}</p>
            <p>Max: {getData.main.temp_max}</p>
          </div>
          <div className="weather__info">
            <div className="weather__card">
              <div>
                <p>Humidity</p>
                <p className="weather__humidity">{getData.main.humidity}</p>
              </div>
            </div>
            <div className="weather__card">
              <div>
                <p>Wind</p>
                <p className="weather__wind">{getData.wind.speed}</p>
              </div>
            </div>
            <div className="weather__card">
              <div>
                <p>Pressure</p>
                <p className="weather__pressure">{getData.main.pressure}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
