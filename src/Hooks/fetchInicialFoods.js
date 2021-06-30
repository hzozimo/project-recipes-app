import { useState, useEffect, useContext } from 'react';
import ContextRecipes from '../context/ContextRecipes';

const useFetchInicialFoods = () => {
  const [foods, setFoods] = useState({});
  const { setData } = useContext(ContextRecipes);

  const fetchFood = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken')
      .then((res) => res.json())
      .then((res) => {
        setFoods(res);
        setData(res);
      });
  };
  useEffect(fetchFood, [setData]);
  return foods;
};

export default useFetchInicialFoods;
