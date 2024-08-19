import React from 'react';
import { BsRepeat } from "react-icons/bs";
import '../styles/RefreshButton.scss';

interface RefreshButtonProps {
  onRefreshClick: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onRefreshClick }) => {
  return (
    <button className="refresh-button" onClick={onRefreshClick}>
      <BsRepeat />
    </button>
  );
};

export default RefreshButton;
