import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserId';
import { useCookies } from 'react-cookie';

const apiUrl = process.env.REACT_APP_API_URL;

export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);
    const userID = useGetUserID();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipes = await axios.get(`${apiUrl}/recipes`);
                setRecipes(recipes.data);
            } catch (err) {
                console.error("Error fetching recipes:", err);
            }
        };

        const fetchSavedRecipes = async () => {
            try {
                const recipes = await axios.get(`${apiUrl}/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(recipes.data.savedRecipes);
            } catch (err) {
                console.error("Error fetching saved recipes:", err);
            }
            
        };

        fetchRecipes();
        if (cookies.access_token) fetchSavedRecipes();

    }, []);

    const saveRecipes = async (recipeID) => {
        try {
            const response = await axios.put(`${apiUrl}/recipes`, {recipeID, userID},
                {headers: {authorization: cookies.access_token}});
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.error("Error saving recipe:", err);
        }
    };

    const isRecipeSaved = (recipeID) => savedRecipes.includes(recipeID);

    return (
        <div className="home">
            <h1>Recipes</h1>
            <ul className="recipe-list">
                {recipes.map((recipe) => (
                    <li key={recipe._id} className="recipe-item">
                        <div className="recipe-name">
                            <h2>{recipe.name}</h2>
                        </div>
                        <div className="recipe-ingredients">
                            {recipe.ingredients.map((ingredient, index) => (
                                <h2 key={index}>{ingredient}</h2>
                            ))}
                        </div>
                        <div className="recipe-instructions">
                            <h2>{recipe.instructions}</h2>
                        </div>
                        <div className="recipe-image">
                            <img src={recipe.imageUrl} alt={recipe.name} />
                        </div>
                        <div className="recipe-cooking-time">
                            <h2>Cooking Time: {recipe.cookingTime} minutes</h2>
                        </div>
                        {isRecipeSaved(recipe._id) ? (
                            <button disabled>Recipe Saved</button>) : (
                            <button className="btn-save" onClick={() => saveRecipes(recipe._id)}>Save Recipe</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
};