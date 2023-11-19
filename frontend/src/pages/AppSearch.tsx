// AppSearch.tsx
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';
import { Recipe } from '../types';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from "../components/RecipeModal";
import { AiOutlineSearch } from 'react-icons/ai';
import AppHeader from "../components/AppHeader";

const AppSearch = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
        undefined
    );
    const pageNumber = useRef(1);

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

        const params = new URLSearchParams(location.search);
        const termFromURL = params.get('term');
        if (termFromURL) {
            setSearchTerm(termFromURL);
            const searchFromURL = async (termFromURL: string) => {
                try {
                    const recipes = await api.searchRecipes(termFromURL, 1);
                    setRecipes(recipes.results);
                    pageNumber.current = 1;
                } catch (e) {
                    console.log(e);
                }
            }

            searchFromURL(termFromURL)
        }
        else {
            setSearchTerm("");

        }
    }, [location.search]);


    const handleSearchSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const recipes = await api.searchRecipes(searchTerm, 1);
            setRecipes(recipes.results);
            pageNumber.current = 1;

            navigate(`/search?term=${encodeURIComponent(searchTerm.trim())}`);
        } catch (e) {
            console.log(e);
        }
    };

    const handleViewMoreClick = async () => {
        const nextPage = pageNumber.current + 1;
        try {
            const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
            setRecipes([...recipes, ...nextRecipes.results]);
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
            <form onSubmit={(event) => handleSearchSubmit(event)}>
                <input
                    type="text"
                    required
                    placeholder="Enter a search term ..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                ></input>
                <button type="submit">
                    <AiOutlineSearch size={40} />
                </button>
            </form>

            <div className="recipe-grid">
                {recipes.map((recipe) => {
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

            <button className="view-more-button" onClick={handleViewMoreClick}>
                View More
            </button>


            {selectedRecipe ? (
                <RecipeModal
                    recipeId={selectedRecipe.id.toString()}
                    onClose={() => setSelectedRecipe(undefined)}
                />
            ) : null}
        </>
    );
};

export default AppSearch;
