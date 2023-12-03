import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchForm from "./Form";
import WeatherList from "./WeatherList";

function WeatherComponent() {
  const [city, setCity] = useState("");
  const [dataWeather, setWeatherData] = useState([]);
  const [newCity, setNewCity] = useState('');
  const [loading, setLoading] = useState(false);



  const fetchWeatherData = async (newCity) => {

    
    try {
      const geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${newCity}&limit=1&appid=${import.meta.env.VITE_API_KEY}`;
      const geoResponse = await axios.get(geoApiUrl);
      const dataGeo = geoResponse.data[0];
      const lat = dataGeo.lat;
      const lon = dataGeo.lon;

      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
      const weatherResponse = await axios.get(weatherApiUrl);
      const dataWeather = weatherResponse.data;

      const processedData = dataWeather.list.map((item) => ({
        icon: item.weather[0].icon,
        date: item.dt * 1000,
        time: item.dt_txt.split(" ")[1],
        temperature: item.main.temp,
        weather: item.weather[0].main,
        wind:item.wind
      }));
  
      setWeatherData(processedData)

      console.log(processedData)

    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  }



  const fetchNavigator = async (lat, lon) => {
    try {
      setLoading(true);
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
      const response = await axios.get(weatherApiUrl);
      const dataWeather = response.data;

      const processedData = dataWeather.list.map((item) => ({
        icon: item.weather[0].icon,
        date: item.dt * 1000,
        time: item.dt_txt.split(" ")[1],
        temperature: item.main.temp,
        weather: item.weather[0].main,
        wind:item.wind
      }));
  

      setWeatherData(processedData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
       fetchNavigator(latitude, longitude);
      },
      error => {
        console.error("Error getting location:", error);
        
      }
    );
  }, []);

  const handleSearch = (searchedCity) => {
    setNewCity(searchedCity);
    setCity(searchedCity); 
    fetchWeatherData(searchedCity); 
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Loading weather...</p>}
      {city && <h4>Forecast from {city} for the next 5 days</h4>}
      <WeatherList dataWeather={dataWeather} />
    </div>
  );
}

export default WeatherComponent;
