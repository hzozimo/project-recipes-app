import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import useFetchIdAndRecomendations from '../Hooks/fetchDetailsAndRecomendations';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import './detalhes.css';

function DetalhesComida() {
  const { id } = useParams();
  const { foodDetails, recomendations } = useContext(ContextRecipes);

  useFetchIdAndRecomendations(id, 'foods');
  console.log('food na pagina de detalhes:', foodDetails);

  const ingredientsList = () => {
    const MAX_INGREDIENTS = 20;
    const ingredients = [];
    const measures = [];
    for (let index = 1; index <= MAX_INGREDIENTS; index += 1) {
      const ingredient = `strIngredient${index}`;
      const measure = `strMeasure${index}`;
      ingredients.push(foodDetails.meals[0][ingredient]);
      measures.push(foodDetails.meals[0][measure]);
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

  const renderYoutube = () => {
    const videoToken = foodDetails.meals[0].strYoutube.split('=')[1];
    const videoUrlEmbed = `https://www.youtube.com/embed/${videoToken}`;
    const videoOptions1 = 'accelerometer; autoplay; clipboard-write; ';
    const videoOptions = `${videoOptions1}encrypted-media; gyroscope; picture-in-picture`;

    return (
      <iframe
        width="560"
        height="315"
        src={ videoUrlEmbed }
        title="YouTube video player"
        frameBorder="0"
        allow={ videoOptions }
        allowFullScreen
        data-testid="video"
      />
    );
  };

  const renderRecomendations = () => {
    const SEIS = 6;
    return (
      recomendations.drinks
        ? (
          <div className="recomendations">
            {recomendations.drinks.slice(0, SEIS).map((drink, index) => (
              <div
                key={ drink.idDrink }
                className="recomendationsChild"
                data-testid={ `${index}-recomendation-card` }
              >
                <img width="100px" src={ drink.strDrinkThumb } alt={ drink.strDrink } />
                <p>{ drink.strAlcoholic }</p>
                <p data-testid={ `${index}-recomendation-title` }>{ drink.strDrink }</p>
              </div>
            ))}
          </div>)
        : <h1> Loading Recomendations</h1>
    );
  };

  return (
    <div>
      { foodDetails.meals
        ? (
          <div>
            <img
              width="500px"
              src={ foodDetails.meals[0].strMealThumb }
              alt={ foodDetails.meals[0].strMeal }
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">
              {' '}
              {foodDetails.meals[0].strMeal}
              {' '}
            </h1>
            <h4 data-testid="recipe-category">
              {' '}
              { foodDetails.meals[0].strCategory }
              {' '}
            </h4>
            <h5>
              {' '}
              {foodDetails.meals[0].strTags}
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
              { foodDetails.meals[0].strInstructions }
              {' '}
            </p>
            { renderYoutube() }
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

export default DetalhesComida;
