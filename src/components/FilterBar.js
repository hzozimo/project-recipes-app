import React, { useContext } from 'react';
import propTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
import '../App.css';
import { filterMealsBtn, filterDrinksBtn } from '../api/fetchFilterBtn';

function FilterBar({ title }) {
  const { setData, setDataDrink } = useContext(ContextRecipes);
  function handlerFilter({ target: { value } }) {
    if (title === 'Comidas') {
      filterMealsBtn(value)
        .then((res) => setData(res));
    }
    if (title === 'Bebidas') {
      filterDrinksBtn(value)
        .then((res) => setDataDrink(res));
    }
  }

  const { mealsCategories, drinksCategories } = useContext(ContextRecipes);

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
