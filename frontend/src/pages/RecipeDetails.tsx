import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams(); // Access the recipe ID from the URL params

    // Fetch and display the recipe details using the ID

    return (
        <div>
            <h2>Recipe Page</h2>
            <p>Recipe ID: {id}</p>
            {/* Add logic to fetch and display recipe details based on the ID */}
        </div>
    );
};

export default RecipeDetails;