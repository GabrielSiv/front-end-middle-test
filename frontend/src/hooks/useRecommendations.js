// useRecommendations.js

import { useState } from 'react';
import { default as getRecommendationsService } from '../services/recommendation';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = (formData) => {
    return getRecommendationsService(formData, products);
  };

  return { recommendations, getRecommendations, setRecommendations };
}

export default useRecommendations;
