import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
import { filterMealsBtn, filterDrinksBtn } from '../api/fetchFilterBtn';
import '../App.css';
// import getAllRecipes from '../service/FoodDrinksRequest';

function FilterBar({ title }) {
  const {
    setData,
    setDataDrink,
    mealsCategories,
    drinksCategories,
    // btnMealsToggle,
    // setBtnMealsToggle,
    // btnDrinksToggle,
    // setBtnDrinksToggle,
  } = useContext(ContextRecipes);

  const [currentValue, setCurrentValue] = useState();

  function handleAllMeals() {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }

  function handleAllDrinks() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then((res) => {
        setDataDrink(res);
      });
  }

  function handlerFilter({ target: { value } }) {
    if (title === 'Comidas') {
      if (value !== currentValue) {
        filterMealsBtn(value)
          .then((res) => setData(res));
        // setBtnMealsToggle(false);
        setCurrentValue(value);
      } else {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
          .then((res) => res.json())
          .then((res) => {
            setData(res);
          });
        // setBtnMealsToggle(true);
        setCurrentValue(null);
      }
    }
    if (title === 'Bebidas') {
      if (value !== currentValue) {
        filterDrinksBtn(value)
          .then((res) => setDataDrink(res));
        setCurrentValue(value);
      } else {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
          .then((res) => res.json())
          .then((res) => {
            setDataDrink(res);
          });
        setCurrentValue(null);
      }
    }
  }

  if (title === 'Comidas') {
    return (
      <div className="filterBar">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ handleAllMeals }
        >
          All
        </button>
        {
          mealsCategories.map((meal, index) => (
            <button
              data-testid={ `${meal.strCategory}-category-filter` }
              value={ `${meal.strCategory}` }
              className="filterButtons"
              type="button"
              key={ index }
              onClick={ handlerFilter }
            >
              {meal.strCategory}
            </button>))
        }
      </div>
    );
  }

  if (title === 'Bebidas') {
    return (
      <div className="filterBar">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ handleAllDrinks }
        >
          All
        </button>
        {
          drinksCategories.map((drink, index) => (
            <button
              data-testid={ `${drink.strCategory}-category-filter` }
              value={ `${drink.strCategory}` }
              className="filterButtons"
              type="button"
              key={ index }
              onClick={ handlerFilter }
            >
              {drink.strCategory}
            </button>))
        }
      </div>
    );
  }
}

FilterBar.propTypes = {
  title: propTypes.string.isRequired,
};

export default FilterBar;
