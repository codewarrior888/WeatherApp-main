import React from 'react';

import Header from './Header';
import CitySearch from './CitySearch';
import CurrentWeather from './CurrentWeather';
import CurrentWeatherDetails from './CurrentWeatherDetails';
import ForecastWeather from './ForecastWeather';
import LocationButton from './LocationButton';
import RefreshButton from './RefreshButton';
import { forecastApiUrl, weatherApiUrl, REACT_OPENWEATHERMAP_API_KEY } from '../components/api';

import '../styles/App.scss';

const App: React.FC = () => {

  // Запросить погоду по городу
  const [currentWeather, setCurrentWeather] = React.useState(null);
  const [forecastWeather, setForecastWeather] = React.useState(null);

  const handleOnSearchChange = (lat: number, lon: number) => {
    const currentTime = new Date().getTime();
  
    const fetchCurrentWeather = fetch(`${weatherApiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${REACT_OPENWEATHERMAP_API_KEY}`);
    const fetchForecastWeather = fetch(`${forecastApiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${REACT_OPENWEATHERMAP_API_KEY}`);
  
    Promise.all([fetchCurrentWeather, fetchForecastWeather])
      .then(async (response) => {
        const currentWeatherResponse = await response[0].json();
        const forecastWeatherResponse = await response[1].json();
        
        const currentWeatherData = { city: currentWeatherResponse.name, ...currentWeatherResponse };
        const forecastWeatherData = { city: forecastWeatherResponse.name, ...forecastWeatherResponse };
        
        setCurrentWeather(currentWeatherData);
        setForecastWeather(forecastWeatherData);
  
        // Сохранить данные в localStorage
        localStorage.setItem('currentWeather', JSON.stringify({ data: currentWeatherData, timestamp: currentTime }));
        localStorage.setItem('forecastWeather', JSON.stringify({ data: forecastWeatherData, timestamp: currentTime }));
      })
      .catch((error) => {console.log(error);});
  };

  // Закэшировать данные на 1 час
  
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
  
  // Определить геолокацию по клику
  const handleLocationClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      handleOnSearchChange(lat, lon);
    }, () => {
      alert('Please allow location access or enter your city manually.');
    });
  };

  
  // Обновить погоду по клику
  const handleRefreshClick = () => {
    const cachedCurrentWeather = localStorage.getItem('currentWeather');
    const cachedForecastWeather = localStorage.getItem('forecastWeather');
  
    if (cachedCurrentWeather && cachedForecastWeather) {
      const { data: { coord: { lat, lon } } } = JSON.parse(cachedCurrentWeather);
      handleOnSearchChange(lat, lon);
    }
  };
  
  // Вывести данные
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
