import { useState, useEffect, useContext } from 'react';
import ContextRecipes from '../context/ContextRecipes';

const useFetchId = (id) => {
  const [food, setFood] = useState({});
  const { setFoodDetails } = useContext(ContextRecipes);

  const fetchId = () => {
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    console.log('URL', URL);
    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        setFood(res);
        setFoodDetails(res);
      })
      .then(console.log('food no hook:', food));
  };

  useEffect(fetchId, []);

  return food;
};

export default useFetchId;
