import React from "react";
import Carousel from "react-elastic-carousel";
import RecipeCard from "./RecipeCard";
import { Recipe } from "../types";

const RecipeSlider = ({ recipes, onRecipeClick, onFavouriteButtonClick }) => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  return (
    <Carousel breakPoints={breakPoints}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={() => onRecipeClick(recipe)}
          onFavouriteButtonClick={onFavouriteButtonClick}
          isFavourite={false} // You need to adjust this based on your logic
        />
      ))}
    </Carousel>
  );
};

export default RecipeSlider;
