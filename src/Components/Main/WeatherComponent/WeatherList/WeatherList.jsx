import React from "react";
import { v4 as uuidv4 } from "uuid";
import WeatherCard from "./WeatherCard/WeatherCard";
import './WeatherList.css'
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

  const WeatherList = ({ dataWeather }) => {
    const processedData = dataWeather.reduce((acc, item) => {
      const date = new Date(item.date).toLocaleDateString();
      const time = item.time;

  
      if (acc[date]) {
        acc[date].push({ ...item, time });
      } else {
        acc[date] = [{ ...item, time }];
      }
  
      return acc;
    }, {});
  
    return (
      <section className="wList">
        {Object.keys(processedData).map((date) => (
          <div className="dayCard"key={date}>
            <h4>{date}</h4>
            {processedData[date].map((weatherItem) => (
              <WeatherCard 
                key={uuidv4()}
                icon={weatherItem.icon}
                weather={weatherItem.weather}
                temp={weatherItem.temperature}
                wind={weatherItem.wind}
                time={weatherItem.time}
              />
            ))}
          </div>
        ))}
      </section>
      
    );
  };
  
  export default WeatherList;


