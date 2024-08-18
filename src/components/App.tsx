import React from 'react';

import Header from './Header';
import CitySearch from './CitySearch';
import CurrentWeather from './CurrentWeather';
import CurrentWeatherDetails from './CurrentWeatherDetails';
import ForecastWeather from './ForecastWeather';
import LocationButton from './LocationButton';
import RefreshButton from './RefreshButton';
import { forecastApi, weatherApi } from '../components/api';

import '../styles/App.css';

const App: React.FC = () => {

  // Запрос погоды по городу
  const [currentWeather, setCurrentWeather] = React.useState(null);
  const [forecastWeather, setForecastWeather] = React.useState(null);

  const handleOnSearchChange = (lat: number, lon: number) => {
    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    const currentTime = new Date().getTime();
  
    const fetchCurrentWeather = fetch(`${weatherApi}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const fetchForecastWeather = fetch(`${forecastApi}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
  
    Promise.all([fetchCurrentWeather, fetchForecastWeather])
      .then(async (response) => {
        const currentWeatherResponse = await response[0].json();
        const forecastWeatherResponse = await response[1].json();
        
        const currentWeatherData = { city: currentWeatherResponse.name, ...currentWeatherResponse };
        const forecastWeatherData = { city: forecastWeatherResponse.name, ...forecastWeatherResponse };
        
        setCurrentWeather(currentWeatherData);
        setForecastWeather(forecastWeatherData);
  
        // Save to localStorage with a timestamp
        localStorage.setItem('currentWeather', JSON.stringify({ data: currentWeatherData, timestamp: currentTime }));
        localStorage.setItem('forecastWeather', JSON.stringify({ data: forecastWeatherData, timestamp: currentTime }));
      })
      .catch((error) => {console.log(error);});
  };

  // Кэширование на 1 час
  
  React.useEffect(() => {
    const cachedCurrentWeather = localStorage.getItem('currentWeather');
    const cachedForecastWeather = localStorage.getItem('forecastWeather');
    const cacheExpiry = 60 * 60 * 1000;
  
    if (cachedCurrentWeather) {
      const { data, timestamp } = JSON.parse(cachedCurrentWeather);
      if (new Date().getTime() - timestamp < cacheExpiry) {
        setCurrentWeather(data);
      }
    }
  
    if (cachedForecastWeather) {
      const { data, timestamp } = JSON.parse(cachedForecastWeather);
      if (new Date().getTime() - timestamp < cacheExpiry) {
        setForecastWeather(data);
      }
    }
  }, []);
  
  // Геолокация по клику
  const handleLocationClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      handleOnSearchChange(lat, lon);
    }, () => {
      alert('Please allow location access or enter your city manually.');
    });
  };

  
  // Обновление погоды по клику
  const handleRefreshClick = () => {
    const cachedCurrentWeather = localStorage.getItem('currentWeather');
    const cachedForecastWeather = localStorage.getItem('forecastWeather');
  
    if (cachedCurrentWeather && cachedForecastWeather) {
      const { data: { coord: { lat, lon } } } = JSON.parse(cachedCurrentWeather);
      handleOnSearchChange(lat, lon);
    }
  };

  return (
    <div className="container">
      <div className="title"><Header /></div>
      <div className="top-row">
        <div className="search-bar">
          <CitySearch onCitySelect={handleOnSearchChange} />
        </div>
        <LocationButton onLocationClick={handleLocationClick} />
        <RefreshButton onRefreshClick={handleRefreshClick} />
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
