import React from "react";
import { weatherIconApiUrl } from "../components/api";
import '../styles/ForecastWeather.scss';

interface ForecastWeatherProps {
    data: any;
}

const Forecast: React.FC<ForecastWeatherProps> = ({ data }) => {
    return (
        <div className="forecast">
            <h2 className="forecast-title">5-DAY FORECAST</h2>

            {data.list.filter((forecast: any, index: number) => index % 8 === 0).map((forecast: any) => (
                <div className="forecast-item" key={forecast.dt}>
                    <div className="forecast-date">{["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(forecast.dt * 1000).getDay()]}</div>
                    <div className="forecast-icon">
                        <img src={`${weatherIconApiUrl}${forecast.weather[0].icon}@2x.png`} alt="weather" />
                    </div>
                    <div className="forecast-temperature">
                        <div className="min-temp">{Math.round(forecast.main.temp_min)}°C</div>
                        <div className="temp-bar">
                            <div style={{ width: `${(forecast.main.temp_max - forecast.main.temp_min) * 10}px` }}></div>
                        </div>
                        <div className="max-temp">{Math.round(forecast.main.temp_max)}°C</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Forecast;
