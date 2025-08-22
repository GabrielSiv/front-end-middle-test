import React, { createContext, useContext, useState } from 'react';
import useProducts from '../hooks/useProducts';
import getRecommendationsService from '../services/recommendation';

const RecommendationsContext = createContext();

export function RecommendationsProvider({ children }) {
  const { products } = useProducts();
  const [recommendations, setRecommendations] = useState([]);

  const calculateRecommendations = (formData) => {
    const newRecs = getRecommendationsService(formData, products);
    setRecommendations(newRecs);
  };

  const value = {
    recommendations,
    calculateRecommendations,
  };

  return (
    <RecommendationsContext.Provider value={value}>
      {children}
    </RecommendationsContext.Provider>
  );
}

export function useRecommendationsContext() {
  const context = useContext(RecommendationsContext);
  if (!context) {
    throw new Error(
      'useRecommendationsContext must be used within a RecommendationsProvider'
    );
  }
  return context;
}
