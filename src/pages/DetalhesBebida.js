import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeDrinksButton from '../components/RecipeDrinksButton';
import ContextRecipes from '../context/ContextRecipes';
import useFetchIdAndRecomendations from '../Hooks/fetchDetailsAndRecomendations';
import shareIcon from '../images/shareIcon.svg';
import './detalhes.css';
import FavoriteDrink from '../components/FavoriteDrink';
import Loading from '../components/Loading';

function DetalhesBebida() {
  const { id } = useParams();
  const [shared, setShared] = useState('escondido');
  const { drinkDetails,
    recomendations,
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
    const ingredientsFiltered = ingredients
      .filter((ingredient) => (ingredient !== '' && ingredient !== null));
    return (
      <>
        {ingredientsFiltered.map((ingredient, index) => (
          (
            <li
              className="ingredient-li"
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {' '}
              {ingredient}
              {' '}
              {measures[index]}
              {' '}
            </li>)
        ))}
      </>
    );
  };

  const renderRecomendations = () => {
    const SEIS = 6;
    return (
      recomendations.meals
        ? (
          <div className="recomendations">
            {recomendations.meals.slice(0, SEIS).map((meal, index) => (
              <Link key={ meal.idMeal } to={ `/comidas/${meal.idMeal}` }>
                <div
                  key={ meal.idMeal }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <div className="mb-5">
                    <p className="m-2">{ meal.strtags }</p>
                    <p
                      className="m-2"
                      data-testid={ `${index}-recomendation-title` }
                    >
                      { meal.strMeal }
                    </p>
                    <img
                      className="mb-5 pb-3 img-thumbnail"
                      width="100em"
                      src={ meal.strMealThumb }
                      alt={ meal.strMeal }
                    />
                  </div>
                </div>
              </Link>))}
          </div>)
        : <Loading />
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
            <h1 data-testid="recipe-title">
              {drinkDetails.drinks[0].strDrink}
            </h1>
            <div className="img-details-container">
              <img
                width="300em"
                src={ drinkDetails.drinks[0].strDrinkThumb }
                alt={ drinkDetails.drinks[0].strDrink }
                data-testid="recipe-photo"
              />
            </div>
            <h4>
              { drinkDetails.drinks[0].strCategory }
            </h4>
            <h5 data-testid="recipe-category">
              {drinkDetails.drinks[0].strAlcoholic}
            </h5>
            <div className="button-details-app">
              <div>
                <button type="button" onClick={ () => sharing() }>
                  <img src={ shareIcon } alt="shareIcon" data-testid="share-btn" />
                </button>
                <p className={ shared }>Link copiado!</p>
              </div>
              <div>
                <FavoriteDrink />
              </div>
            </div>
            <ul>
              <h3 className="ingredientes-title">Ingredients</h3>
              { ingredientsList() }
            </ul>
            <h3 className="ingredientes-title">Instructions</h3>
            <p className="instructions-details-app" data-testid="instructions">
              { drinkDetails.drinks[0].strInstructions }
            </p>
            <div>
              { renderRecomendations() }
            </div>
            <RecipeDrinksButton drinkDetails={ drinkDetails } />
          </div>)
        : <Loading />}
    </div>
  );
}

export default DetalhesBebida;
