import React from "react";
import { weatherIconApi } from "../components/api";

import '../styles/CurrentWeather.scss';


interface CurrentWeatherProps {
    data: any;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({data}) => {

    return (
        <div className="current-weather">
            <div className="info">
                <p className="city">{data.name}, {data.sys.country}</p>
                <p className="temperature">{Math.round(data.main.temp)}°C</p>
                <p className="weather-description">{data.weather[0].description}</p>
                <img className="weather-icon" src={`${weatherIconApi}${data.weather[0].icon}@2x.png`} alt="weather" />
                <div className="temp-range">
                    <div className="min-temp">
                        <p className="current-label">L:</p>
                        <p className="current-value">{Math.round(data.main.temp_min)}°C</p>
                    </div>
                    <div className="max-temp">
                        <p className="current-label">H:</p>
                        <p className="current-value">{Math.round(data.main.temp_max)}°C</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;