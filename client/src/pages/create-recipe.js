import "../App.css";
import {useState, useEffect } from "react";   
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const apiUrl = process.env.REACT_APP_API_URL;

export const CreateRecipe = () => {

    const userID = useGetUserID();
    const navigate = useNavigate();
    const [cookies, _] = useCookies(["access_token"]);

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });

    useEffect(() => {
        setRecipe(prev => ({...prev, userOwner: userID}));
    }, [userID]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value});
    }
    
    const handleIngredientChange = (event, idx) => {
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients});
        
    }

    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
    }

    const OnSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${apiUrl}/recipes`, recipe, {
                headers: { authorization: cookies.access_token }
            });
            alert(res.data.message)
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Failed to create recipe. Please try again.");
        }
    }
        

    return <div className="create-recipe">
        <h1>Create a New Recipe</h1>
        <div className="create-recipe-container">
        <form className="create-recipe-form" onSubmit={OnSubmit}>
            <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={handleChange}></input>
            </div>
            <div className="form-group ingredients">
            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient, idx) => (
                <input key={idx} 
                type="text" 
                value={ingredient}
                name="ingredients"
                id= "ingredient"
                onChange={(e) => {handleIngredientChange(e, idx)}}></input>
            ))}
            <button type="button" onClick={addIngredient}>Add Ingredient</button>
            </div>
            <div className="form-group">
            <label htmlFor="instructions">Instructions</label>
            <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <textarea type="text" id="imageUrl" name="imageUrl" onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}></input>
            </div>
            <button type="submit">Create Recipe</button>
        </form>
        </div>
    </div>;
};