import React, { useState } from 'react';
import { Recipe } from '../types';
import RecipeCard from './RecipeCard';

const SimpleSlider = ({ recipes, setSelectedRecipe }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % recipes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + recipes.length) % recipes.length);
  };

  return (
    <div className="relative mb-4">
      <h2 className="mb-2">{recipes.length > 0 && recipes[currentSlide].category}</h2>
      <div className="flex overflow-hidden">
        {recipes.map((recipe, index) => (
          <div
            key={recipe.id}
            className={`flex-shrink-0 w-full transform transition-transform duration-300 ${
              index === currentSlide ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <RecipeCard recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />
          </div>
        ))}
      </div>

      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r-md focus:outline-none"
        onClick={prevSlide}
      >
        Previous
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-l-md focus:outline-none"
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  );
};

export default SimpleSlider;
