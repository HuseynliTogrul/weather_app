import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API}&q=${location}&days=7&aqi=yes&alerts=yes`
        );
        setWeatherData(response.data);
        setError("");
      } catch (error) {
        console.log(error);
        setWeatherData(null);
        setError("Enter the correct city!");
      }
    };
    if (location) {
      fetchData();
    }
  }, [location]);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value)

    if(value === ""){
      setError("")
    }
  };

  return (
    <div className="text-center mt-10">
      <div className="m-auto max-w-[600px] mb-10">
        <h1 className="weatherTitle font-bold text-[30px]">Hava Durumu</h1>
        <input
          className="weatherInput border border-white rounded-lg py-2 px-4 mt-3 "
          type="text"
          placeholder="Enter the city..."
          onChange={handleLocationChange}
        />
        {error && <p className="text-red-500 mt-2 font-semibold">{error}</p>}
      </div>

      {weatherData && (
        <div className="city-weather flex justify-evenly">
          {weatherData.forecast.forecastday.map((day) => (
            <div
              className="weather-da shadow-[rgba(0,0,0,0.1)_0px_20px_25px_-5px,rgba(0,0,0,0.04)_0px_10px_10px_-5px] p-7 rounded-lg w-[150px] flex flex-col justify-between 
              border-[rgb(122,124,126/14%)] border bg-white"
              key={day.date}
            >
              <h2>{day.date}</h2>
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
              />
              <div>
                <p>{day.day.condition.text}</p>
                <p>{day.day.avgtemp_c}°C</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
