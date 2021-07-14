import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import ContextRecipes from '../context/ContextRecipes';
import { filterMealsBtn, filterDrinksBtn } from '../api/fetchFilterBtn';
// import getAllRecipes from '../service/FoodDrinksRequest';
import useInicialFilters from '../Hooks/fetchInicialFiters';
import '../App.css';

function FilterBar({ title }) {
  const {
    setData,
    setDataDrink,
    mealsCategories,
    drinksCategories,
    currentValueFood,
    setCurrentValueFood,
    currentValueDrink,
    setCurrentValueDrink,
  } = useContext(ContextRecipes);

  useInicialFilters(title);

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
      if (value !== currentValueFood) {
        filterMealsBtn(value)
          .then((res) => setData(res));
        setCurrentValueFood(value);
      } else {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
          .then((res) => res.json())
          .then((res) => {
            setData(res);
          });
        setCurrentValueFood(null);
      }
    }
    if (title === 'Bebidas') {
      if (value !== currentValueDrink) {
        filterDrinksBtn(value)
          .then((res) => setDataDrink(res));
        setCurrentValueDrink(value);
      } else {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
          .then((res) => res.json())
          .then((res) => {
            setDataDrink(res);
          });
        setCurrentValueDrink(null);
      }
    }
  }

  if (title === 'Comidas') {
    return (
      <div>
        <Button
          className="btn btn-dark btn-sm m-1 p-1"
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleAllMeals() }
        >
          All
        </Button>
        {
          mealsCategories.map((meal, index) => (
            <Button
              data-testid={ `${meal.strCategory}-category-filter` }
              value={ `${meal.strCategory}` }
              className="btn btn-dark btn-sm m-1 p-1"
              type="button"
              key={ index }
              onClick={ handlerFilter }
            >
              {meal.strCategory}
            </Button>))
        }
      </div>
    );
  }

  if (title === 'Bebidas') {
    return (
      <section>
        <Button
          className="btn btn-dark btn-sm m-1 p-1"
          type="button"
          data-testid="All-category-filter"
          onClick={ handleAllDrinks }
        >
          All
        </Button>
        {
          drinksCategories.map((drink, index) => (
            <Button
              data-testid={ `${drink.strCategory}-category-filter` }
              value={ `${drink.strCategory}` }
              className="btn btn-dark btn-sm m-1 p-1"
              type="button"
              key={ index }
              onClick={ handlerFilter }
            >
              {drink.strCategory}
            </Button>))
        }
      </section>
    );
  }
}

FilterBar.propTypes = {
  title: propTypes.string.isRequired,
};

export default FilterBar;
