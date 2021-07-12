import { useContext, useEffect } from 'react';
import ContextRecipes from '../context/ContextRecipes';

const useFetchDrinksIngredients = () => {
  const { drinkIngredients, setDrinkIngredients } = useContext(ContextRecipes);

  function fetchDrinksIngredients() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then((res) => res.json())
      .then((res) => setDrinkIngredients(res));
  }
  useEffect(fetchDrinksIngredients, []);
  return drinkIngredients;
};

export default useFetchDrinksIngredients;
