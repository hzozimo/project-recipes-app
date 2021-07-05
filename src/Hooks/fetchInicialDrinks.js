import { useState, useEffect, useContext } from 'react';
import ContextRecipes from '../context/ContextRecipes';

const useFetchInicialDrinks = () => {
  const [Drinks, setDrinks] = useState({});
  const { setDataDrink } = useContext(ContextRecipes);

  const fetchDrink = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then((res) => {
        setDataDrink(res);
        setDrinks(res);
      });
  };
  useEffect(fetchDrink, [setDataDrink]);
  return Drinks;
};

export default useFetchInicialDrinks;
