import React from 'react';
import { BsPinMap } from "react-icons/bs";
import '../styles/LocationButton.scss';

interface LocationButtonProps {
  onLocationClick: () => void;
}

const LocationButton: React.FC<LocationButtonProps> = ({ onLocationClick }) => {
  return (
    <button className="location-button" onClick={onLocationClick}>
      <BsPinMap />
    </button>
  );
};

export default LocationButton;
