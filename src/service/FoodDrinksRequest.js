const allMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const allDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const foodsCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const drinksCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const filterFoodCategories = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const filterDrinksCategories = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

const getAllRecipes = async (title) => {
  const URL = title === 'Comidas' ? allMeals : allDrinks;
  const res = await fetch(URL);
  if (title === 'Comidas') {
    const { meals } = await res.json();
    return meals;
  }
  const { drinks } = await res.json();
  return drinks;
};

export const getCategories = async (title) => {
  const numberOfCategories = 5;
  const URL = title === 'Comidas' ? foodsCategories : drinksCategories;
  const response = await fetch(URL);
  if (title === 'Comidas') {
    const { meals } = await response.json();
    return meals.slice(0, numberOfCategories);
  }
  const { drinks } = await response.json();
  return drinks.slice(0, numberOfCategories);
};

export const getFilterCategories = async (title, value) => {
  const URL = title === 'Comidas' ? filterFoodCategories : filterDrinksCategories;
  const response = await fetch(URL + value);
  if (title === 'Comidas') {
    const { meals } = await response.json();
    return meals;
  }
  const { drinks } = await response.json();
  return drinks;
};

export default getAllRecipes;
