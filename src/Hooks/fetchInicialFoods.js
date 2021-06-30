import { useState, useEffect } from 'react';

const useFetchInicialFoods = () => {
  const [foods, setFoods] = useState({});

  const fetchFood = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken')
      .then((res) => res.json())
      .then((res) => setFoods(res));
  };
  useEffect(fetchFood, []);
  return foods;
};

export default useFetchInicialFoods;
