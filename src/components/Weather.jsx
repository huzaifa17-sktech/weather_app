import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import loupe_icon from "../assets/loupe.png";
import sun_icon from "../assets/sun.png";
import weatherr_icon from "../assets/weatherr.png";
import windy_icon from "../assets/windy.png";
// import weather_icon from '../assets/weather.png'

const Weather = () => {

  const inputRef = useRef()
  const [weatherData,setWeatherData] = useState(false);

  const allIcons = {
  "01d": sun_icon,
  "01n": loupe_icon,       // or night version
  "02d": sun_icon,
  "02n": weatherr_icon,
  "03d": windy_icon,
  }

  const search = async (city) => {
    if (city ==""){
        alert("Enter City Name");
        return;
    }
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

        const response = await fetch(url);
        const data = await response.json();

        if(!response.ok){
            alert(data.message);
            return;
        }
        console.log(data);
        const icon = allIcons[data.weather[0].icon] || sun_icon;
        setWeatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            temperature: Math.floor(data.main.temp),
            location: data.name,
            icon: icon
        })
    } catch (error) {
        setWeatherData(false);
        console.error("Error in fetching weathe data")
    }
  }

  useEffect(()=>{
    search("Mumbai");
  },[])

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={loupe_icon} alt="Search Icon" onClick={()=>search(inputRef.current.value)}/>
      </div>
      {weatherData?<>
     <img src={weatherData.icon} alt="" className="weather-icon" />
      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={weatherr_icon} alt="" />
          <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={windy_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed}</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      </>:<></>}

      
    </div>
  );
};

export default Weather;
