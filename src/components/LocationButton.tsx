import React from 'react';
import { TbLocation } from "react-icons/tb";
import '../styles/LocationButton.scss';

interface LocationButtonProps {
  onLocationClick: () => void;
}

const LocationButton: React.FC<LocationButtonProps> = ({ onLocationClick }) => {
  return (
    <button className="location-button" onClick={onLocationClick}>
      <TbLocation />
    </button>
  );
};

export default LocationButton;
