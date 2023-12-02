import React, { useState, useEffect } from "react";
import AppHeader from "../components/AppHeader";
import * as api from "../api";
import RecipeCard from "../components/RecipeCard";
import { Recipe } from "../types";
import SimpleSlider from "../components/SimpleSlider";

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


  return (
    <>
      <AppHeader />

      <SimpleSlider
        recipes={favouriteRecipes}
        setSelectedRecipe={setSelectedRecipe}
      />
      <SimpleSlider
        recipes={randomRecipes}
        setSelectedRecipe={setSelectedRecipe}
      />
      <SimpleSlider
        recipes={vegetarianRecipes}
        setSelectedRecipe={setSelectedRecipe}
      />
      <SimpleSlider
        recipes={dessertRecipes}
        setSelectedRecipe={setSelectedRecipe}
      />
    </>
  );
};
export default AppHome;
