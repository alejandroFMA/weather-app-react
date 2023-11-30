import React from "react";
import './WeatherCard.css'


const WeatherCard = ({ weather, icon, temp, wind,time }) => {
  return (
    <article className="wCard">
          <p>Hour: {time}</p>
          <img src={`http://openweathermap.org/img/w/${icon}.png`}></img>
          <p>{weather}</p>
          <p>Temperature: {temp} °C</p>
          <p>Wind speed: {wind.speed} km/h</p>             
    </article>
  );
};
export default WeatherCard;
