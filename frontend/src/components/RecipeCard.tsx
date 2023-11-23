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
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
            <div className="recipe-card" onClick={onClick}>
                <img className="w-full h-32 object-cover mb-2" src={recipe.image} alt={recipe.title} />
                <div className="recipe-card-title">
                    <span
                        onClick={(event) => {
                            event.stopPropagation();
                            onFavouriteButtonClick(recipe);
                        }}
                    >
                        {isFavourite ? <AiFillHeart size={25} color="red" /> : <AiOutlineHeart size={25} />}
                    </span>
                    <h3 className="text-sm mt-2">{recipe.title}</h3>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard