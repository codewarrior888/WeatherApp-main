import React from 'react';
import { MdRefresh } from "react-icons/md";
import '../styles/RefreshButton.scss';

interface RefreshButtonProps {
  onRefreshClick: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onRefreshClick }) => {
  return (
    <button className="refresh-button" onClick={onRefreshClick}>
      <MdRefresh />
    </button>
  );
};

export default RefreshButton;
