import React, { useContext } from 'react';
import propTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
import '../App.css';

function FilterBar({ title }) {
  const { mealsCategories, drinksCategories } = useContext(ContextRecipes);

  if (title === 'Comidas') {
    return (
      {console.log(mealsCategories);}
      <div className="filterBar">
        {
          mealsCategories.map((meal, index) => (
            <button
              data-testid={ `${meal.strCategory}-category-filter` }
              className="filterButtons"
              type="button"
              key={ index }
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
              className="filterButtons"
              type="button"
              key={ index }
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
