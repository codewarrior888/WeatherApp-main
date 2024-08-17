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
                    <p className="details-label">Humidity:</p>
                    <p className="details-value">{data.main.humidity}%</p>
                </div>
                <div className="wind">
                    <p className="details-label">Wind:</p>
                    <p className="details-value">{data.wind.speed} m/s</p>
                </div>
                <div className="feels">
                    <p className="details-label">Feels like:</p>
                    <p className="details-value">{data.main.feels_like} m/s</p>
                </div>
                <div className="pressure">
                    <p className="details-label">Pressure:</p>
                    <p className="details-value">{data.main.pressure} hPa</p>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;