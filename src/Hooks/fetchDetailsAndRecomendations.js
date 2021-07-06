import { useState, useEffect, useContext } from 'react';
import ContextRecipes from '../context/ContextRecipes';

const useFetchIdAndRecomendations = (id, type) => {
  const [food, setFood] = useState({});
  const [drink, setDrink] = useState({});
  const [recomendationsState, setRecomendationsState] = useState({});
  const { setFoodDetails,
    setRecomendations, setDrinkDetails } = useContext(ContextRecipes);

  const fetchIdAndRecomendations = () => {
    if (type === 'foods') {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      console.log('URL', URL);
      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          setFood(res);
          setFoodDetails(res);
        })
        .then(console.log('food no hook:', food));
      const URL_DRINKS_RECOMEND = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      fetch(URL_DRINKS_RECOMEND)
        .then((res) => res.json())
        .then((res) => {
          setRecomendations(res);
          setRecomendationsState(res);
        });
    }
    if (type === 'drinks') {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      console.log('URL', URL);
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
    }
  };

  useEffect(fetchIdAndRecomendations, []);

  return [food, drink, recomendationsState];
};

export default useFetchIdAndRecomendations;
