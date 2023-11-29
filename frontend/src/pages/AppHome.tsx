import React, { useState, useEffect } from "react";
import AppHeader from "../components/AppHeader";
import * as api from "../api";
import RecipeCard from "../components/RecipeCard";
import { Recipe } from "../types";

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
        setRandomRecipes(recipes);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDessertRecipes = async () => {
      try {
        const response = await api.getDessertRecipes();
        const recipes = response.recipes; 
        setRandomRecipes(recipes);
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

  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecipes.results]);
      console.log("🚀 ~ file: AppHome.tsx:68 ~ handleViewMoreClick ~ Recipes.results:", Recipes.results)
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };

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
  return (
    <>
      <AppHeader />


      <h2>Favourite Recipes</h2>
      <div className="recipe-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {favouriteRecipes.map((recipe) => {
          const isFavourite = favouriteRecipes.some(
            (favRecipe) => recipe.id === favRecipe.id
          );

          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFavouriteButtonClick={
                isFavourite ? removeFavouriteRecipe : addFavouriteRecipe
              }
              isFavourite={isFavourite}
            />
          );
        })}
      </div>

      <h2>Random Recipes</h2>
      <div className="recipe-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {randomRecipes.map((recipe) => {
          const isFavourite = favouriteRecipes.some(
            (favRecipe) => recipe.id === favRecipe.id
          );

          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFavouriteButtonClick={
                isFavourite ? removeFavouriteRecipe : addFavouriteRecipe
              }
              isFavourite={isFavourite}
            />
          );
        })}
      </div>

      <h2>Vegetarian Recipes</h2>
      <div className="recipe-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {vegetarianRecipes.map((recipe) => {
          const isFavourite = favouriteRecipes.some(
            (favRecipe) => recipe.id === favRecipe.id
          );

          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFavouriteButtonClick={
                isFavourite ? removeFavouriteRecipe : addFavouriteRecipe
              }
              isFavourite={isFavourite}
            />
          );
        })}
      </div>

      <h2>Dessert Recipes</h2>
      <div className="recipe-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {dessertRecipes.map((recipe) => {
          const isFavourite = favouriteRecipes.some(
            (favRecipe) => recipe.id === favRecipe.id
          );

          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFavouriteButtonClick={
                isFavourite ? removeFavouriteRecipe : addFavouriteRecipe
              }
              isFavourite={isFavourite}
            />
          );
        })}
      </div>
    </>
  );
};

export default AppHome;
