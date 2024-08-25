import React from 'react';
import { useNavigate } from 'react-router-dom';

const StoryCard = ({ _id, title }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="card bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out" 
      onClick={() => navigate(`/stories/${_id}`)}
    >
      <div className="card-body p-6 bg-gradient-to-r from-purple-400 via-pink-700 to-purple-500">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <p className="text-white">Dive into this interactive adventure.</p>
      </div>
    </div>
  );
};

export default StoryCard;
