import { Recipe } from '../types'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface Props {
    recipe: Recipe
    isFavourite: boolean
    onClick: () => void
    onFavouriteButtonClick: (recipe: Recipe) => void
}

const RecipeCard = ({ recipe, onClick, onFavouriteButtonClick, isFavourite }: Props) => {
    return (
        <div className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg m-2 recipe-card" onClick={onClick}>
            <img className="w-full h-40 object-cover" src={recipe.image} alt={recipe.title} />
            <div className="p-4 recipe-card-title">
                <span
                    onClick={(event) => {
                        event.stopPropagation()
                        onFavouriteButtonClick(recipe)
                    }}
                    className="cursor-pointer"
                >
                    {isFavourite ? <AiFillHeart size={25} color="red" /> : <AiOutlineHeart size={25} />}

                </span>
                <h3 className="mt-2 text-lg font-semibold">{recipe.title}</h3>
            </div>
        </div>
    )
}

export default RecipeCard