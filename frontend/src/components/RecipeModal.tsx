import * as RecipeAPI from '../api'
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { RecipeSummary } from "../types"

interface Props {
    recipeId: string
    onClose: () => void
}

const RecipeModal = ({ recipeId, onClose }: Props) => {

    const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>()

    useEffect(() => {
        const fetchRecipeSummary = async () => {
            try {
                const summaryRecipe = await RecipeAPI.getRecipeSummary(recipeId)
                setRecipeSummary(summaryRecipe)
            } catch (e) {
                console.log(e)
            }
        }

        fetchRecipeSummary()
    }, [recipeId])

    if (!recipeSummary) {
        return <></>
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="modal bg-white p-4 rounded-lg shadow-md" style={{ width: '45%' }}>
                    <div className="modal-header flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">{recipeSummary.title}</h2>
                        <span className="cursor-pointer text-gray-500" onClick={onClose}>
                            &times;
                        </span>
                    </div>
                    <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: recipeSummary.summary }}></p>
                    <Link to={`/recipe/${recipeId}`}>
                        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            View Recipe
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default RecipeModal