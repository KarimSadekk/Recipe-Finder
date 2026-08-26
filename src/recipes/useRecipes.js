import { useCallback, useState } from "react";
const useRecipes = () => {
    const [recipes, setRecipes] = useState([]); // search results
    const [favourites, setFavourites] = useState([]);
    const [favRecipes, setFavRecipes] = useState([]);
    const [bestRecipes, setBestRecipes] = useState([]);

    const getRecipes = useCallback(async () => {
    const res = await fetch("http://localhost:8000/searchedBefore");
    const data = await res.json();
    const mapped = data.map(r => ({
      ...r.recipe,
    }));
    setRecipes(mapped);
    return data;
  }, []);

  const fetchFavouritesID = useCallback(async () => {
      try {
        const res = await fetch("http://localhost:8000/favourites");
        const data = await res.json();
        setFavourites(data.map(fav => fav.recipeId));
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    }, []);

    const fetchFavRecipes = useCallback(async () => {
      try {
        const res = await fetch("http://localhost:8000/favRecipes");
        const data = await res.json();
        const mapped = data.map(r => ({
        ...r.recipe,
        }));
        setFavRecipes(mapped);
        return data
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    }, []);

    const getBestRecipes = useCallback(async () => {
      try{
      const res = await fetch("https://dummyjson.com/recipes");
      const data = await res.json();

      const sorted = data.recipes
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);

      setBestRecipes(sorted) //
      }catch(error){
        console.error("Error fetching favourites:", error);
      }
    }, []);

    const fetchAllCuisines = useCallback(async () => {
    const res = await fetch("https://dummyjson.com/recipes");
    const data = await res.json();
    setRecipes(data.recipes);
  }, []);


    return { recipes,setRecipes,getRecipes,fetchFavouritesID,favourites,fetchFavRecipes,
             favRecipes,setFavourites,getBestRecipes,bestRecipes,fetchAllCuisines};
}
 
export default useRecipes;