import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import ContextRecipes from './ContextRecipes';
import fetchCategories from '../api/fetchCategories';

function RecipesProvider({ children }) {
  const [filter, setFilter] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [currentFood, setCurrentFood] = useState({});
  const [currentFoodIngredients, setCurrentFoodIngredients] = useState([]);
  const [mainIngredient, setMain] = useState('');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [dataDrink, setDataDrink] = useState({});
  const [btnMealsToggle, setBtnMealsToggle] = useState(false);
  const [btnDrinksToggle, setBtnDrinksToggle] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const drinksCategoriesAPI = await fetchCategories('drinks');
      const mealCategoriesAPI = await fetchCategories('meals');
      setMealsCategories(mealCategoriesAPI);
      setDrinksCategories(drinksCategoriesAPI);
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
    btnMealsToggle,
    setBtnMealsToggle,
    btnDrinksToggle,
    setBtnDrinksToggle,
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
