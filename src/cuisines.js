import { useEffect, useState } from "react";
import useRecipes from "./recipes/useRecipes";
import { div } from "framer-motion/client";
import "./cuisine.css";
import { useNavigate } from "react-router-dom";
const  Cuisines= () => {
    const {fetchAllCuisines, recipes, setRecipes} = useRecipes();
    const [cuisine, setCuisines] = useState([])
    const [isClicked, setIsClicked] = useState(false)
    useEffect(()=>{
        fetchAllCuisines();
    },[])

    useEffect(()=>{
        if (!recipes.length) return
        const uniqueCuisines = [...new Set(recipes.map(r => r.cuisine))];
        setCuisines(uniqueCuisines)
    },[recipes])

    const navigate = useNavigate();

    function handleClick(newRecipe){
    navigate(`/recipeDetails/${newRecipe.id}`,{
      state: {  // ✅ Add 'state:' property
          recipe: newRecipe // ✅ Use the fetched data directly
        }
    }); // then navigate manually
  }
    const CUISINE_TO_COUNTRY = {
    Italian: "it",
    Asian: "cn",           
    American: "us",
    Mexican: "mx",
    Mediterranean: "gr",   
    Pakistani: "pk",
    Japanese: "jp",
    Moroccan: "ma",
    Korean: "kr",
    Greek: "gr",
    Thai: "th",
    Indian: "in",
    Turkish: "tr",
    Smoothie: "us",       
    Russian: "ru",
    Lebanese: "lb",
    Brazilian: "br"
    };

    function handleClick(c){
        setIsClicked(isClicked === c? null:c)
    }

    return ( 
        <div className="wrappedFlags">
  {cuisine.map((cuisine, index) => (
    <div className="flags" key={index}>
      <div 
        className={`flag ${isClicked === cuisine ? 'active' : ''}`}
        onClick={() => handleClick(cuisine)}
      >
        <h2>{cuisine}</h2>
        <img 
          src={`https://flagcdn.com/w80/${CUISINE_TO_COUNTRY[cuisine]}.png`}
          alt={`${cuisine} flag`}
          loading="lazy"
        />
      </div>

      {isClicked === cuisine && (
        <div className="recipesContainer">
          {recipes
            .filter((r) => r.cuisine === cuisine)
            .map((recipe) => (
              <div key={recipe.id} className="recipeView">
                <img src={recipe.image} alt={recipe.name} />
                <div className="recipeInfo">
                  <h2>{recipe.name}</h2>
                  <div className="recipeMeta">
                    <span className="rating">⭐ {recipe.rating}</span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  ))}
</div>
    );
}
 
export default Cuisines;

// ⭐ Option 1 — Clicking a cuisine filters recipes`
// This is the cleanest, best UX, and matches real apps.
// Flow:
// You show cuisine cards (with flags).
// User clicks "Italian".
// Navigate to /cuisine/Italian
// RecipesList shows only recipes where r.cuisine === 'Italian'.
// This looks fully professional.