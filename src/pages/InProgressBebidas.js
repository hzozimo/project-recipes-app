import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeDrinksButton from '../components/RecipeDrinksButton';
import ContextRecipes from '../context/ContextRecipes';
import useFetchIdAndRecomendations from '../Hooks/fetchDetailsAndRecomendations';
import shareIcon from '../images/shareIcon.svg';
import FavoriteDrink from '../components/FavoriteDrink';
import './detalhes.css';

function InProgressBebida() {
  const { id } = useParams();
  const [shared, setShared] = useState('escondido');
  const { drinkDetails,
  } = useContext(ContextRecipes);

  useFetchIdAndRecomendations(id, 'drinks');
  console.log('drink na pagina de detalhes:', drinkDetails);

  const ingredientsList = () => {
    const MAX_INGREDIENTS = 15;
    const ingredients = [];
    const measures = [];
    for (let index = 1; index <= MAX_INGREDIENTS; index += 1) {
      const ingredient = `strIngredient${index}`;
      const measure = `strMeasure${index}`;
      ingredients.push(drinkDetails.drinks[0][ingredient]);
      measures.push(drinkDetails.drinks[0][measure]);
    }
    const ingredientsFiltered = ingredients.filter((ingredient) => (ingredient !== '' && ingredient !== null));
    return (
      <div>
        {ingredientsFiltered.map((ingredient, index) => (
          (
            <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              <input
                className="thought"
                id={ `ingredient-${index}` }
                type="checkbox"
                value={ ingredient }
                name={ ingredient }
                data-testid={ `${index}-ingredient-step` }
              />
              <label htmlFor={ `ingredient-${index}` } className="finish">
                {' '}
                {ingredient}
                {' '}
                {measures[index]}
                {' '}
              </label>
            </p>)
        ))}
      </div>
    );
  };

  const sharing = () => {
    copy(window.location.href);
    setShared('aparente');
  };

  return (
    <div>
      { drinkDetails.drinks
        ? (
          <div>
            <img
              width="500px"
              src={ drinkDetails.drinks[0].strDrinkThumb }
              alt={ drinkDetails.drinks[0].strDrink }
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">
              {' '}
              {drinkDetails.drinks[0].strDrink}
              {' '}
            </h1>
            <h4>
              {' '}
              { drinkDetails.drinks[0].strCategory }
              {' '}
            </h4>
            <h5 data-testid="recipe-category">
              {' '}
              {drinkDetails.drinks[0].strAlcoholic}
            </h5>
            <div>
              <div>
                <button type="button" onClick={ () => sharing() }>
                  <img src={ shareIcon } alt="shareIcon" data-testid="share-btn" />
                </button>
                <p className={ shared }>Link copiado!</p>
              </div>
              {' '}
              <FavoriteDrink />
            </div>
            <div>
              <h2> Ingredients </h2>
              { ingredientsList() }
            </div>
            <h2>instructions</h2>
            <p data-testid="instructions">
              {' '}
              { drinkDetails.drinks[0].strInstructions }
              {' '}
            </p>
            <RecipeDrinksButton drinkDetails={ drinkDetails } />
            <button type="button" data-testid="finish-recipe-btn">
              Finalizar Receita
            </button>
          </div>)
        : <h1> Loading...</h1>}
    </div>
  );
}

export default InProgressBebida;
