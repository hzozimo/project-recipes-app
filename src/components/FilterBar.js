import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';
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
      <div>
        <Button
          className="btn btn-dark btn-sm m-3 p-3"
          type="button"
          data-testid="All-category-filter"
          onClick={ handleAllMeals }
        >
          All
        </Button>
        {
          mealsCategories.map((meal, index) => (
            <Button
              data-testid={ `${meal.strCategory}-category-filter` }
              value={ `${meal.strCategory}` }
              className="btn btn-dark btn-sm m-3 p-3"
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
      <div>
        <Button
          className="btn btn-dark btn-sm m-3 p-3"
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
              className="btn btn-dark btn-sm m-3 p-3"
              type="button"
              key={ index }
              onClick={ handlerFilter }
            >
              {drink.strCategory}
            </Button>))
        }
      </div>
    );
  }
}

FilterBar.propTypes = {
  title: propTypes.string.isRequired,
};

export default FilterBar;
