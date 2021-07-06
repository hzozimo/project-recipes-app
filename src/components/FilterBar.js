import React, { useContext } from 'react';
import propTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
import '../App.css';
import { filterMealsBtn, filterDrinksBtn } from '../api/fetchFilterBtn';

function FilterBar({ title }) {
  const {
    setData,
    setDataDrink,
    mealsCategories,
    drinksCategories,
    btnMealsStatus,
    setBtnMealsStatus,
    btnDrinksStatus,
    setBtnDrinksStatus,
  } = useContext(ContextRecipes);

  function handlerFilter({ target: { value, status } }) {
    // console.log(status);
    if (title === 'Comidas') {
      setBtnMealsStatus(status === 'checked' ? 'unchecked' : 'checked');
      filterMealsBtn(value)
        .then((res) => setData(res));
    }
    if (title === 'Bebidas') {
      setBtnDrinksStatus(status === 'checked' ? 'unchecked' : 'checked');
      filterDrinksBtn(value)
        .then((res) => setDataDrink(res));
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
              status={ btnMealsStatus } // Source: https://snack.expo.io/?name=ToggleButton&description=https%3A%2F%2Fcallstack.github.io%2Freact-native-paper%2Ftoggle-button.html&code=import%20*%20as%20React%20from%20%27react%27%3B%0Aimport%20%7B%20ToggleButton%20%7D%20from%20%27react-native-paper%27%3B%0A%0Aconst%20ToggleButtonExample%20%3D%20()%20%3D%3E%20%7B%0A%20%20const%20%5Bstatus%2C%20setStatus%5D%20%3D%20React.useState(%27checked%27)%3B%0A%0A%20%20const%20onButtonToggle%20%3D%20value%20%3D%3E%20%7B%0A%20%20%20%20setStatus(status%20%3D%3D%3D%20%27checked%27%20%3F%20%27unchecked%27%20%3A%20%27checked%27)%3B%0A%20%20%7D%3B%0A%0A%20%20return%20(%0A%20%20%20%20%3CToggleButton%0A%20%20%20%20%20%20icon%3D%22bluetooth%22%0A%20%20%20%20%20%20value%3D%22bluetooth%22%0A%20%20%20%20%20%20status%3D%7Bstatus%7D%0A%20%20%20%20%20%20onPress%3D%7BonButtonToggle%7D%0A%20%20%20%20%2F%3E%0A%20%20)%3B%0A%7D%3B%0A%0Aexport%20default%20ToggleButtonExample%3B%0A&dependencies=react-native-paper
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
              status={ btnDrinksStatus } // Source: https://snack.expo.io/?name=ToggleButton&description=https%3A%2F%2Fcallstack.github.io%2Freact-native-paper%2Ftoggle-button.html&code=import%20*%20as%20React%20from%20%27react%27%3B%0Aimport%20%7B%20ToggleButton%20%7D%20from%20%27react-native-paper%27%3B%0A%0Aconst%20ToggleButtonExample%20%3D%20()%20%3D%3E%20%7B%0A%20%20const%20%5Bstatus%2C%20setStatus%5D%20%3D%20React.useState(%27checked%27)%3B%0A%0A%20%20const%20onButtonToggle%20%3D%20value%20%3D%3E%20%7B%0A%20%20%20%20setStatus(status%20%3D%3D%3D%20%27checked%27%20%3F%20%27unchecked%27%20%3A%20%27checked%27)%3B%0A%20%20%7D%3B%0A%0A%20%20return%20(%0A%20%20%20%20%3CToggleButton%0A%20%20%20%20%20%20icon%3D%22bluetooth%22%0A%20%20%20%20%20%20value%3D%22bluetooth%22%0A%20%20%20%20%20%20status%3D%7Bstatus%7D%0A%20%20%20%20%20%20onPress%3D%7BonButtonToggle%7D%0A%20%20%20%20%2F%3E%0A%20%20)%3B%0A%7D%3B%0A%0Aexport%20default%20ToggleButtonExample%3B%0A&dependencies=react-native-paper
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
