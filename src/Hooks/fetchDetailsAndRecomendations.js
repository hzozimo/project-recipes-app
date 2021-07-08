import { useState, useEffect, useContext } from 'react';
import ContextRecipes from '../context/ContextRecipes';

const useFetchIdAndRecomendations = (id, type) => {
  const [food, setFood] = useState({});
  const [drink, setDrink] = useState({});
  const [recomendationsState, setRecomendationsState] = useState({});
  const { setFoodDetails,
    setRecomendations,
    setDrinkDetails,
    favorited,
    setFavorited,
    setLoadInProgressRecipes } = useContext(ContextRecipes);

  const fetchIdAndRecomendations = () => {
    setLoadInProgressRecipes(JSON.parse(localStorage.getItem('inProgressRecipes')));
    setFavorited(false);
    if (type === 'foods') {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          setFood(res);
          setFoodDetails(res);
        });
      const URL_DRINKS_RECOMEND = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      fetch(URL_DRINKS_RECOMEND)
        .then((res) => res.json())
        .then((res) => {
          setRecomendations(res);
          setRecomendationsState(res);
        });
      let favoriteRecipes = [];
      if (localStorage.getItem('favoriteRecipes')) {
        favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      }
      if (favoriteRecipes.filter((recipe) => recipe.id === id).length > 0) {
        setFavorited(true);
      }
    }
    if (type === 'drinks') {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          setDrink(res);
          setDrinkDetails(res);
        })
        .then(console.log('drink no hook:', food));
      const URL_FOODS_RECOMEND = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      fetch(URL_FOODS_RECOMEND)
        .then((res) => res.json())
        .then((res) => {
          setRecomendations(res);
          setRecomendationsState(res);
        });
      let favoriteRecipes = [];
      if (localStorage.getItem('favoriteRecipes')) {
        favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      }
      if (favoriteRecipes.filter((recipe) => recipe.id === id).length > 0) {
        setFavorited(true);
      }
    }
  };
  useEffect(fetchIdAndRecomendations, []);
  return [food, drink, recomendationsState, favorited];
};

export default useFetchIdAndRecomendations;
