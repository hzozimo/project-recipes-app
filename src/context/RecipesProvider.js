import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';
import fetchCategories from '../api/fetchCategories';
import { fetchAreas } from '../api/fetchAreas';

function RecipesProvider({ children }) {
  const [filter, setFilter] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [currentFood, setCurrentFood] = useState({});
  const [currentFoodIngredients, setCurrentFoodIngredients] = useState([]);
  const [mainIngredient, setMain] = useState('');
  const [data, setData] = useState({});
  const [dataDrink, setDataDrink] = useState({});
  const [loading, setLoading] = useState(false);
  const [foodDetails, setFoodDetails] = useState({});
  const [drinkDetails, setDrinkDetails] = useState({});
  const [recomendations, setRecomendations] = useState({});
  const [favorited, setFavorited] = useState(false);
  const [loadInProgressRecipes, setLoadInProgressRecipes] = useState({
    cocktails: [],
    meals: [],
  });
  const [foodIngredients, setFoodIngredients] = useState({});
  const [drinkIngredients, setDrinkIngredients] = useState({});
  const [currentValueFood, setCurrentValueFood] = useState(null);
  const [currentValueDrink, setCurrentValueDrink] = useState(null);
  const [areasFood, setAreasFood] = useState({});
  // const [filterAreaFood, setFilterAreaFood] = useState('All');

  useEffect(() => {
    async function fetchData() {
      const areasAPI = await fetchAreas();
      const drinksCategoriesAPI = await fetchCategories('drinks');
      const mealCategoriesAPI = await fetchCategories('meals');
      setMealsCategories(mealCategoriesAPI);
      setDrinksCategories(drinksCategoriesAPI);
      setAreasFood(areasAPI);
    }
    fetchData();
  }, []);

  const state = {
    setCurrentFoodIngredients,
    currentFoodIngredients,
    setCurrentFood,
    currentFood,
    setMealsCategories,
    setFilter,
    mealsCategories,
    drinksCategories,
    filter,
    mainIngredient,
    setMain,
    data,
    setData,
    loading,
    setLoading,
    dataDrink,
    setDataDrink,
    foodDetails,
    setFoodDetails,
    recomendations,
    setRecomendations,
    drinkDetails,
    setDrinkDetails,
    favorited,
    setFavorited,
    loadInProgressRecipes,
    setLoadInProgressRecipes,
    foodIngredients,
    setFoodIngredients,
    drinkIngredients,
    setDrinkIngredients,
    currentValueFood,
    setCurrentValueFood,
    currentValueDrink,
    setCurrentValueDrink,
    areasFood,
    setAreasFood,
    // filterAreaFood,
    // setFilterAreaFood,
  };

  return (
    <ContextRecipes.Provider value={ state }>
      { children }
    </ContextRecipes.Provider>
  );
}

export default RecipesProvider;

RecipesProvider.propTypes = {
  children: propTypes.func,
}.isRequired;
