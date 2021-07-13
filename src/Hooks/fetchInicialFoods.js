import { useState, useEffect, useContext } from 'react';
import ContextRecipes from '../context/ContextRecipes';

const useFetchInicialFoods = () => {
  const [foods, setFoods] = useState({});
  const { setData, currentValueFood } = useContext(ContextRecipes);

  const fetchFood = () => {
    if (currentValueFood === null) {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((res) => res.json())
        .then((res) => {
          setFoods(res);
          setData(res);
        });
    }
  };
  useEffect(fetchFood, [setData]);
  return foods;
};

export default useFetchInicialFoods;
