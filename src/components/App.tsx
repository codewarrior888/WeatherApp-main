import React from 'react';

import CitySearch from './CitySearch';
import CurrentWeather from './CurrentWeather';
import CurrentWeatherDetails from './CurrentWeatherDetails';
import ForecastWeather from './ForecastWeather';
import { forecastApi, weatherApi } from '../components/api';

import '../styles/App.css';

const App: React.FC = () => {

  const [currentWeather, setCurrentWeather] = React.useState(null);
  const [forecastWeather, setForecastWeather] = React.useState(null);

  const handleOnSearchChange = (lat: number, lon: number) => {
    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

    const fetchCurrentWeather = fetch(`${weatherApi}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const fetchForecastWeather = fetch(`${forecastApi}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);

    Promise.all([fetchCurrentWeather, fetchForecastWeather])
      .then(async (response) => {
        const currentWeatherResponse = await response[0].json();
        const forecastWeatherResponse = await response[1].json();
        
        setCurrentWeather({ city: currentWeatherResponse.name, ...currentWeatherResponse });
        setForecastWeather({ city: forecastWeatherResponse.name, ...forecastWeatherResponse });
      })
      .catch((error) => {console.log(error);});
  };

  return (
    <div className="container">
      <div className="search-bar">
        <CitySearch onCitySelect={handleOnSearchChange} />
      </div>
      <div className="current-weather">
        {currentWeather && <CurrentWeather data={currentWeather} />}
      </div>
      <div className="third-row">
        <div className="left-column">
          {forecastWeather && <ForecastWeather data={forecastWeather} />}
        </div>
        <div className="right-column">
          {currentWeather && <CurrentWeatherDetails data={currentWeather} />}
        </div>
      </div>
    </div> 
  );
};

export default App;
