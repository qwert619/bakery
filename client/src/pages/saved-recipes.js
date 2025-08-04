import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserId';

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);

    const userID = useGetUserID();

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const recipes = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
                setSavedRecipes(recipes.data.savedRecipes);
            } catch (err) {
                console.error("Error fetching recipes:", err);
            }
        };
        fetchSavedRecipes();
    }, []);

    const removeRecipe = async (recipeID) => {
        try {
            const response = await axios.delete(`http://localhost:3001/recipes/savedRecipes/${userID}/${recipeID}`);
            console.log(response.data);
            // Update the local state by filtering out the removed recipe
            setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== recipeID));
        } catch (err) {
            console.error("Error removing recipe:", err);
        }
    };

    return (
        <div className="home">
            <h1>Recipes</h1>
            <ul className="recipe-list">
                {savedRecipes.map((savedRecipe) => (
                    <li key={savedRecipe._id} className="recipe-item">
                        <div className="recipe-name">
                            <h2>{savedRecipe.name}</h2>
                        </div>
                        <div className="recipe-ingredients">
                            {savedRecipe.ingredients.map((ingredient, index) => (
                                <h2 key={index}>{ingredient}</h2>
                            ))}
                        </div>
                        <div className="recipe-instructions">
                            <h2>{savedRecipe.instructions}</h2>
                        </div>
                        <div className="recipe-image">
                            <img src={savedRecipe.imageUrl} alt={savedRecipe.name} />
                        </div>
                        <div className="recipe-cooking-time">
                            <h2>Cooking Time: {savedRecipe.cookingTime} minutes</h2>
                        </div>
                        <button type="submit" onClick={() => removeRecipe(savedRecipe._id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    )
};