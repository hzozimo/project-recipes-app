import { useContext, useEffect } from 'react';
import ContextRecipes from '../context/ContextRecipes';

const useFetchFoodsIngredients = () => {
  const { foodIngredients, setFoodIngredients } = useContext(ContextRecipes);

  function fetchFoodsIngredients() {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then((res) => res.json())
      .then((res) => setFoodIngredients(res));
  }
  useEffect(fetchFoodsIngredients, []);
  return foodIngredients;
};

export default useFetchFoodsIngredients;
