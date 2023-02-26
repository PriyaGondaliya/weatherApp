import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  setTemperature,
  setHumidity,
  setWindSpeed,
  toggleUnit,
  selectWeather,
} from "../features/weather/weatherSlice";
import "./weather.css";
const Weather: React.FC = () => {
  const dispatch = useDispatch();
  const { city, temperature, humidity, windSpeed, unit } =
    useSelector(selectWeather);
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=13cdd25b9d5681796cc24799a09298ff&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(setCity(data.name));
        dispatch(setTemperature(data.main.temp));
        dispatch(setHumidity(data.main.humidity));
        dispatch(setWindSpeed(data.wind.speed));
        localStorage.setItem(
          "weather",
          JSON.stringify({
            city: data.name,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
          })
        );
      })
      .catch((error) => console.log(error));

    setSearchText("");
  };

  const handleUnitToggle = () => {
    dispatch(toggleUnit());
  };

  React.useEffect(() => {
    const savedWeather = localStorage.getItem("weather");
    if (savedWeather) {
      const { city, temperature, humidity, windSpeed } =
        JSON.parse(savedWeather);
      dispatch(setCity(city));
      dispatch(setTemperature(temperature));
      dispatch(setHumidity(humidity));
      dispatch(setWindSpeed(windSpeed));
    }
  }, [dispatch]);

  return (
    <div className="mainContainer">
      <div className="card">
        <div className="topBar">
          <div className="searchField">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />{" "}
            <button onClick={handleSearch}>Search</button>
          </div>
          <button onClick={handleUnitToggle} className="switch">
            {unit === "C" ? "°F" : "°C"}
          </button>
        </div>
        <div>
          <h1 className="city">{city}</h1>

          <div className="boxContainer">
            <div className="box">
              <p>Humidity</p>
              <h1>{humidity}%</h1>
            </div>
            <div className="box">
              <p>Temperature</p>
              <h1>
                {unit === "C"
                  ? `${temperature} °C`
                  : `${(temperature * 9) / 5 + 32} °F`}
              </h1>
            </div>
            <div className="box">
              <p>Wind</p>
              <h1>{windSpeed} km/h</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Weather;
