import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import useFetchIdAndRecomendations from '../Hooks/fetchDetailsAndRecomendations';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import './detalhes.css';

function DetalhesBebida() {
  const { id } = useParams();
  const { drinkDetails, recomendations } = useContext(ContextRecipes);

  useFetchIdAndRecomendations(id, 'drinks');
  console.log('drink na pagina de detalhes:', drinkDetails);

  const ingredientsList = () => {
    const MAX_INGREDIENTS = 20;
    const ingredients = [];
    const measures = [];
    for (let index = 1; index <= MAX_INGREDIENTS; index += 1) {
      const ingredient = `strIngredient${index}`;
      const measure = `strMeasure${index}`;
      ingredients.push(drinkDetails.drinks[0][ingredient]);
      measures.push(drinkDetails.drinks[0][measure]);
    }
    return (
      <div>
        {ingredients.map((ingredient, index) => (
          (ingredient !== '' || ingredient !== null)
            ? (
              <p data-testid={ `${index}-ingredient-name-and-measure` }>
                {' '}
                {ingredient}
                {' '}
                {measures[index]}
                {' '}
              </p>)
            : false))}
      </div>
    );
  };

  const renderRecomendations = () => {
    const SEIS = 6;
    return (
      recomendations.meals
        ? (
          <div className="recomendations">
            {console.log('recomen', recomendations)}
            {recomendations.meals.slice(0, SEIS).map((meal, index) => (
              <div
                key={ meal.idDrink }
                className="recomendationsChild"
                data-testid={ `${index}-recomendation-card` }
              >
                <img width="100px" src={ meal.strMealThumb } alt={ meal.strMeal } />
                <p>{ meal.strtags }</p>
                <p data-testid={ `${index}-recomendation-title` }>{ meal.strMeal }</p>
              </div>
            ))}
          </div>)
        : <h1> Loading Recomendations</h1>
    );
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
              <img src={ shareIcon } alt="shareIcon" data-testid="share-btn" />
              {' '}
              <img src={ whiteHeartIcon } alt="fovorited" data-testid="favorite-btn" />
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
            <div>
              { renderRecomendations() }
            </div>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="iniciarReceita"
            >
              Inciar Receita

            </button>
          </div>)
        : <h1> Loading...</h1>}
    </div>
  );
}

export default DetalhesBebida;
