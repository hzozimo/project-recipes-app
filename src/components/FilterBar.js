import React, { useContext } from 'react';
import propTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
import '../App.css';
import apiRequest from '../service/service';

function FilterBar({ title }) {
  function handlerFilter({ target: value }) {
    if (title === Comidas) {
      apiRequest('ingrediente', value);
    }
  }

  const { mealsCategories, drinksCategories } = useContext(ContextRecipes);

  // async fetchList() {
  //   const { patchName } = this.props;
  //   if (patchName === '/comidas') {
  //     const req = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  //     const results = await req.json();
  //     this.setState({ results });
  //   }
  //   if (patchName === '/bebidas') {
  //     const req = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  //     const results = await req.json();
  //     this.setState({ results });
  //   }

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
