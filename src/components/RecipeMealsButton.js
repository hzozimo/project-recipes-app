import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function RecipeMealsButton({ foodDetails }) {
  const history = useHistory();
  let doneRecipes = [];
  let inProgressRecipes = {};
  let isInProgress = false;
  const recipeId = foodDetails.meals[0].idMeal;
  if (localStorage.getItem('doneRecipes')) {
    doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  }

  if (localStorage.getItem('inProgressRecipes') !== null) {
    inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  }

  const isDone = doneRecipes.includes((recipe) => recipe
    .id === recipeId);

  if (inProgressRecipes.meals && inProgressRecipes.meals[recipeId]) {
    isInProgress = true;
  }

  if (isDone) { return false; }

  if (isInProgress) {
    return (
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="iniciarReceita"
      >
        Continuar Receita
      </button>
    );
  }

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="iniciarReceita"
      onClick={ () => history.push(`/comidas/${recipeId}/in-progress`) }
    >
      Start Recipe
    </button>
  );
}

RecipeMealsButton.propTypes = {
  foodDetails: PropTypes.shape({ meals: [] }).isRequired,
};

export default RecipeMealsButton;
