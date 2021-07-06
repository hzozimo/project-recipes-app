import React, { useContext } from 'react';
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
    btnMealsToggle,
    setBtnMealsToggle,
    btnDrinksToggle,
    setBtnDrinksToggle,
  } = useContext(ContextRecipes);

  function handlerFilter({ target: { value } }) {
    if (title === 'Comidas') {
      if (btnMealsToggle === true) {
        filterMealsBtn(value)
          .then((res) => setData(res));
        setBtnMealsToggle(false);
      } else {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
          .then((res) => res.json())
          .then((res) => {
            setData(res);
          });
        setBtnMealsToggle(true);
      }
    }
    if (title === 'Bebidas') {
      if (btnDrinksToggle === true) {
        filterDrinksBtn(value)
          .then((res) => setDataDrink(res));
        setBtnDrinksToggle(false);
      } else {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
          .then((res) => res.json())
          .then((res) => {
            setDataDrink(res);
          });
        setBtnDrinksToggle(true);
      }
    }
  }

  if (title === 'Comidas') {
    return (
      <div className="filterBar">
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
