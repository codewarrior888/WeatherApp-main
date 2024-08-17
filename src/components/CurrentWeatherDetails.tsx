import React from "react";

import '../styles/CurrentWeatherDetails.css';


interface CurrentWeatherDetailsProps {
    data: any;
}

const CurrentWeather: React.FC<CurrentWeatherDetailsProps> = ({data}) => {

    return (
        <div className="current-weather">
            <div className="details">
                <div className="humidity">
                    <p className="parameter-label">Humidity:</p>
                    <p className="parameter-value">{data.main.humidity}%</p>
                </div>
                <div className="wind">
                    <p className="parameter-label">Wind:</p>
                    <p className="parameter-value">{data.wind.speed} m/s</p>
                </div>
                <div className="feels">
                    <p className="parameter-label">Feels like:</p>
                    <p className="parameter-value">{data.main.feels_like} m/s</p>
                </div>
                <div className="pressure">
                    <p className="parameter-label">Pressure:</p>
                    <p className="parameter-value">{data.main.pressure} hPa</p>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;