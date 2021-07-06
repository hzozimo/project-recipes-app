import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import useFetchId from '../Hooks/fetchDetails';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DetalhesComida() {
  const { id } = useParams();
  const { foodDetails } = useContext(ContextRecipes);

  useFetchId(id);
  console.log('food na pagina de detalhes:', foodDetails);

  const ingredientsList = () => {
    const MAX_INGREDIENTS = 20;
    const ingredients = [];
    for (let index = 1; index <= MAX_INGREDIENTS; index += 1) {
      const ingredient = `strIngredient${index}`;
      ingredients.push(foodDetails.meals[0][ingredient]);
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

  return (
    <div>
      {Object.keys(foodDetails).length > 0
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
            <h5>
              {' '}
              {foodDetails.meals[0].strTags}
            </h5>
            <div>
              <img src={ shareIcon } alt="shareIcon" data-testid="share-btn" />
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
          </div>)
        : <h1> Loading...</h1>}
    </div>
  );
}

export default DetalhesComida;
