import { useParams } from 'react-router-dom';
import * as RecipeAPI from '../api';
import { useEffect, useState } from 'react';
import { RecipeInfo } from '../types';

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
        <div>
            <h2>{recipeInfo.title}</h2>
            <p>Recipe ID: {recipeInfo.id}</p>
            <p>Ready in minutes: {recipeInfo.readyInMinutes}</p>
            <p>Servings: {recipeInfo.servings}</p>
            <p>Vegan: {recipeInfo.vegan ? 'Yes' : 'No'}</p>
            <p>Gluten-Free: {recipeInfo.glutenFree ? 'Yes' : 'No'}</p>
            <p>Health Score: {recipeInfo.healthScore}</p>
            <img src={recipeInfo.image} alt={recipeInfo.title} />
            <h3>Ingredients:</h3>
            <ul>
                {recipeInfo.extendedIngredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.name}: {ingredient.amount} {ingredient.unit}
                    </li>
                ))}
            </ul>

            <h3>Instructions:</h3>
            <ul>
                {recipeInfo.analyzedInstructions.map((instruction, index) => (


                        <ol>
                            {instruction.steps.map((step, stepIndex) => (
                                <li key={stepIndex}>{step.step}</li>
                            ))}
                        </ol>

                ))}
            </ul>
        </div>
    );
};

export default RecipeDetails;
