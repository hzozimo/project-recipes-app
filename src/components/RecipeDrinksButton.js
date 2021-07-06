import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function RecipeDrinksButton({ drinkDetails }) {
  const history = useHistory();
  let doneRecipes = [];
  let inProgressRecipes = {};
  let isInProgress = false;
  const recipeId = drinkDetails.drinks[0].idDrink;
  if (localStorage.getItem('doneRecipes')) {
    doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  }

  if (localStorage.getItem('inProgressRecipes') !== null) {
    inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  }

  const isDone = doneRecipes.includes((recipe) => recipe
    .id === recipeId);

  if (inProgressRecipes.cocktails && inProgressRecipes.cocktails[recipeId]) {
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
      onClick={ () => history.push(`/bebidas/${recipeId}/in-progress`) }
    >
      Iniciar Receita
    </button>
  );
}

RecipeDrinksButton.propTypes = {
  drinkDetails: PropTypes.shape({ drinks: [] }).isRequired,
};

export default RecipeDrinksButton;
