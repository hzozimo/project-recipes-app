import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
import { filterMealsBtn, filterDrinksBtn } from '../api/fetchFilterBtn';
import '../App.css';

function FilterBar({ title }) {
  const {
    setData,
    setDataDrink,
    mealsCategories,
    drinksCategories,
    currentValue,
    setCurrentValue,
  } = useContext(ContextRecipes);

  useEffect(() => {
    if (title === 'Comidas' && currentValue !== null) {
      filterMealsBtn(currentValue)
        .then((res) => setData(res));
    }
    if (title === 'Bebidas' && currentValue !== null) {
      filterDrinksBtn(currentValue)
        .then((res) => setDataDrink(res));
    }
  }, []);

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
        setCurrentValue(value);
      } else {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
          .then((res) => res.json())
          .then((res) => {
            setData(res);
          });
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
          onClick={ () => handleAllMeals() }
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
            </button>
          ))
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
            </button>
          ))
        }
      </div>
    );
  }
}

FilterBar.propTypes = {
  title: propTypes.string.isRequired,
};

export default FilterBar;
