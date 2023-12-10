import { useParams } from 'react-router-dom';
import * as RecipeAPI from '../api';
import { useEffect, useState } from 'react';
import { RecipeInfo } from '../types';
import AppHeader from "../components/AppHeader";

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipeInfo, setRecipeInfo] = useState<RecipeInfo>();

    useEffect(() => {
        const fetchRecipeInfo = async () => {
            try {
                const infoRecipe = await RecipeAPI.getRecipeInfo(id);
                setRecipeInfo(infoRecipe);
            } catch (e) {
                console.log(e);
            }
        };

        fetchRecipeInfo();
    }, [id]);

    if (!recipeInfo) {
        return <div>Loading...</div>;
    }

    console.log(recipeInfo)

    return (
        <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded shadow-md">
            <AppHeader />
            <h2 className="text-3xl font-bold mb-4">{recipeInfo.title}</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <img src={recipeInfo.image} alt={recipeInfo.title} className="w-full h-auto rounded" />
                </div>
                <div>
                    <p><strong>Recipe ID:</strong> {recipeInfo.id}</p>
                    <p><strong>Ready in minutes:</strong> {recipeInfo.readyInMinutes}</p>
                    <p><strong>Servings:</strong> {recipeInfo.servings}</p>
                    <p><strong>Vegan:</strong> {recipeInfo.vegan ? 'Yes' : 'No'}</p>
                    <p><strong>Gluten-Free:</strong> {recipeInfo.glutenFree ? 'Yes' : 'No'}</p>
                    <p><strong>Health Score:</strong> {recipeInfo.healthScore}</p>
                </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Ingredients:</h3>
            <ul>
                {recipeInfo.extendedIngredients.map((ingredient, index) => (
                    <li key={index} className="mb-1">
                        {ingredient.name}: {ingredient.amount} {ingredient.unit}
                    </li>
                ))}
            </ul>

            <h3 className="text-xl font-bold mt-4 mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside">
                {recipeInfo.analyzedInstructions.map((instruction, index) => (
                    <li key={index}>
                        {instruction.steps.map((step, stepIndex) => (
                            <p key={stepIndex}>{step.step}</p>
                        ))}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default RecipeDetails;
