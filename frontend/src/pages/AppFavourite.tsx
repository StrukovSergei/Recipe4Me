// AppFavourites.tsx
import React, { useState, useEffect } from 'react';
import * as api from '../api';
import { Recipe } from '../types';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from "../components/RecipeModal";
import AppHeader from "../components/AppHeader";




const AppFavourites = () => {
    const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
        undefined
    );

    useEffect(() => {
        const fetchFavouriteRecipes = async () => {
            try {
                const favouriteRecipes = await api.getFavouriteRecipes();
                setFavouriteRecipes(favouriteRecipes.results);
            } catch (error) {
                console.log(error);
            }
        };

        fetchFavouriteRecipes();
    }, []);

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
            <div className="recipe-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {favouriteRecipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onClick={() => setSelectedRecipe(recipe)}
                        onFavouriteButtonClick={removeFavouriteRecipe}
                        isFavourite={true}
                    />
                ))}
            </div>

            {
                selectedRecipe ? (
                    <RecipeModal
                        recipeId={selectedRecipe.id.toString()}
                        onClose={() => setSelectedRecipe(undefined)}
                    />
                ) : null
            }
        </>
    );
};

export default AppFavourites;
