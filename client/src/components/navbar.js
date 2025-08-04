import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link className="nav-logo" to="/">🍳 RecipeApp</Link>
        <div className="nav-links">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/create-recipe">Create Recipe</Link>
          {!cookies.access_token ? (
            <Link className="nav-link" to="/auth">Login/Register</Link>
          ) : (
            <>
              <Link className="nav-link" to="/saved-recipes">Saved Recipes</Link>
              <button className="logout-btn" onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};