import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./App.css";
import { Home } from "./pages/home";
import { SavedRecipes } from "./pages/saved-recipes";
import { CreateRecipe } from "./pages/create-recipe";
import { Auth } from "./pages/auth";

import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/saved-recipes" element={<SavedRecipes />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/auth" element={<Auth />} />
            </Routes> 
        </Router>
      </CookiesProvider>
    </div>
  );
}

export default App;
