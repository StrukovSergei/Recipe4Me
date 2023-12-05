import React, { useState, useEffect } from "react";
import AppHeader from "../components/AppHeader";
import * as api from "../api";
import RecipeCard from "../components/RecipeCard";
import { Recipe } from "../types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecipeModal from "../components/RecipeModal";

const AppHome = () => {
  const [randomRecipes, setRandomRecipes] = useState<Recipe[]>([]);
  const [vegetarianRecipes, setVegetarianRecipes] = useState<Recipe[]>([]);
  const [dessertRecipes, setDessertRecipes] = useState<Recipe[]>([]);
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );



  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const response = await api.getRandomRecipes();
        const recipes = response.recipes;
        setRandomRecipes(recipes);
        
      } catch (error) {
        console.log(error);
      }
    };

    const fetchVegetarianRecipes = async () => {
      try {
        const response = await api.getVegetarianRecipes();
        const recipes = response.recipes;
        setVegetarianRecipes(recipes)
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDessertRecipes = async () => {
      try {
        const response = await api.getDessertRecipes();
        const recipes = response.recipes;
        setDessertRecipes(recipes)
      } catch (error) {
        console.log(error);
      }
    };

    const fetchFavouriteRecipes = async () => {
      try {
        const recipes = await api.getFavouriteRecipes();
        setFavouriteRecipes(recipes.results);
      } catch (error) {
        console.log(error);
      }
    };



    fetchRandomRecipes();
    fetchVegetarianRecipes();
    fetchDessertRecipes();
    fetchFavouriteRecipes();
  }, []);


  const addFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.addFavouriteRecipe(recipe);
      setFavouriteRecipes([...favouriteRecipes, recipe]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.removeFavouriteRecipe(recipe);
      const updatedRecipes = favouriteRecipes.filter(
        (favRecipe) => recipe.id !== favRecipe.id
      );
      setFavouriteRecipes(updatedRecipes);
    } catch (error) {
      console.log(error);
    }
  };


  const renderSliderContent = (recipes: Recipe[]) => {
    return recipes.map((recipe) => (
      <div key={recipe.id} className="bg-white h-[450px] text-black rounded-xl">
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={() => setSelectedRecipe(recipe)}
          onFavouriteButtonClick={
            favouriteRecipes.some((favRecipe) => recipe.id === favRecipe.id)
              ? removeFavouriteRecipe
              : addFavouriteRecipe
          }
          isFavourite={favouriteRecipes.some(
            (favRecipe) => recipe.id === favRecipe.id
          )}
        />
      </div>
    ));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
    <>
      <AppHeader />

      <div className="flex flex-col mb-4">
        <h2>Favourite Recipes</h2>
        <Slider {...settings}>{renderSliderContent(favouriteRecipes)}</Slider>
      </div>

      <div className="flex flex-col mb-4">
        <h2>Random Recipes</h2>
        <Slider {...settings}>{renderSliderContent(randomRecipes)}</Slider>
      </div>

      <h2>Vegetarian Recipes</h2>
      <Slider {...settings}>{renderSliderContent(vegetarianRecipes)}</Slider>

      <h2>Dessert Recipes</h2>
      <Slider {...settings}>{renderSliderContent(dessertRecipes)}</Slider>

      {selectedRecipe ? (
        <RecipeModal
          recipeId={selectedRecipe.id.toString()}
          onClose={() => setSelectedRecipe(undefined)}
        />
      ) : null}
    </>
  );
};

export default AppHome;