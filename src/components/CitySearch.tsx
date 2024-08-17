import React from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import axios from 'axios';
import { citySearchApi } from '../components/api';

interface CitySearchProps {
  onCitySelect: (lat: number, lon: number) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onCitySelect }) => {
  const [searchValue, setSearchValue] = React.useState(null);
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  const loadOptions = async (inputValue: string) => {
    if (!inputValue) return { options: [] }; // Ensure input is provided

    try {
      const response = await axios.get(
        `${citySearchApi}?q=${inputValue}&limit=5&appid=${apiKey}`
      );

      const options = response.data.map((city: any) => ({
        value: `${city.lat},${city.lon}`,
        label: `${city.name}, ${city.state ? city.state + ', ' : ''}${city.country}`,
      }));

      return { options };
    } catch (error) {
      console.error('Error fetching city data:', error);
      return { options: [] };
    }
  };

  const handleOnChange = (searchData: any) => {
    if (searchData) {
        const [lat, lon] = searchData.value.split(',').map(Number);
        onCitySelect(lat, lon);
    }
  };

  return (
    <AsyncPaginate
      placeholder="Search for a city"
      value={searchValue}
      debounceTimeout={500}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default CitySearch;
