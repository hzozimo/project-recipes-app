import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import ContextRecipes from '../context/ContextRecipes';
import useFetchIdAndRecomendations from '../Hooks/fetchDetailsAndRecomendations';
import shareIcon from '../images/shareIcon.svg';
import FavoriteFood from '../components/FavoriteFood';
import Loading from '../components/Loading';
import './detalhes.css';

import RecipeMealsButton from '../components/RecipeMealsButton';

function DetalhesComida() {
  const { id } = useParams();
  const [shared, setShared] = useState('escondido');
  const { foodDetails,
    recomendations,
  } = useContext(ContextRecipes);

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
    const ingredientsFiltered = ingredients
      .filter((ingredient) => (ingredient !== '' && ingredient !== null));
    console.log('filtered', ingredientsFiltered);
    return (
      <>
        {ingredientsFiltered.map((ingredient, index) => (
          (
            <li
              className="ingredient-li"
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
              {measures[index]}
            </li>)
        ))}
      </>
    );
  };

  const renderYoutube = () => {
    const videoToken = foodDetails.meals[0].strYoutube.split('=')[1];
    const videoUrlEmbed = `https://www.youtube.com/embed/${videoToken}`;
    const videoOptions1 = 'accelerometer; autoplay; clipboard-write; ';
    const videoOptions = `${videoOptions1}encrypted-media; gyroscope; picture-in-picture`;

    return (
      <div className="iframe-container">
        <iframe
          className="iframe-video"
          width="300"
          height="300"
          src={ videoUrlEmbed }
          title="YouTube video player"
          frameBorder="0"
          allow={ videoOptions }
          allowFullScreen
          data-testid="video"
        />
      </div>
    );
  };

  const renderRecomendations = () => {
    const SEIS = 6;
    return (
      recomendations.drinks
        ? (
          <div className="recomendations">
            {recomendations.drinks.slice(0, SEIS).map((drink, index) => (
              <Link key={ drink.idDrink } to={ `/bebidas/${drink.idDrink}` >
                <div
                  
                  data-testid={ `${index}-recomendation-card` }
                >
                  <div className="mb-5">
                    <p className="m-2">{ drink.strAlcoholic }</p>
                    <p
                      className="m-2"
                      data-testid={ `${index}-recomendation-title` }
                    >
                      { drink.strDrink }
                    </p>
                    <img
                      className="mb-5 pb-3 img-thumbnail"
                      width="100em"
                      src={ drink.strDrinkThumb }
                      alt={ drink.strDrink }
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>)
        : <Loading />
    );
  };

  const sharing = () => {
    copy(window.location.href);
    setShared('aparente');
  };

  return (
    <section>
      { foodDetails.meals
        ? (
          <div>

            <h1 data-testid="recipe-title">
              {foodDetails.meals[0].strMeal}
            </h1>
            <div className="img-details-container">
              <img
                width="300em"
                src={ foodDetails.meals[0].strMealThumb }
                alt={ foodDetails.meals[0].strMeal }
                data-testid="recipe-photo"
              />
            </div>
            <h4 data-testid="recipe-category">
              { foodDetails.meals[0].strCategory }
            </h4>
            <h5>
              {foodDetails.meals[0].strTags}
            </h5>
            <div className="button-details-app">
              <div>
                <button type="button" onClick={ () => sharing() }>
                  <img src={ shareIcon } alt="shareIcon" data-testid="share-btn" />
                </button>
                <p className={ shared }>Link copiado!</p>
              </div>
              <div>
                <FavoriteFood />
              </div>
            </div>
            <ul>
              <p className="ingredientes-title">Ingredients</p>
              { ingredientsList() }
            </ul>
            <h3 className="ingredientes-title">Instructions</h3>
            <p
              className="instructions-details-app"
              data-testid="instructions"
            >
              {' '}
              { foodDetails.meals[0].strInstructions }
              {' '}
            </p>
            { renderYoutube() }
            <div>
              { renderRecomendations() }
            </div>
            <RecipeMealsButton foodDetails={ foodDetails } />
          </div>)
        : <Loading />}
    </section>
  );
}

export default DetalhesComida;
