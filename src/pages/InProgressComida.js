// * A foto deve possuir o atributo `data-testid="recipe-photo"`;
// * O título deve possuir o atributo `data-testid="recipe-title"`;
// * O botão de compartilhar deve possuir o atributo `data-testid="share-btn"`;
// * O botão de favoritar deve possuir o atributo `data-testid="favorite-btn"`;
// * O texto da categoria deve possuir o atributo `data-testid="recipe-category"`;
// * Os ingredientes devem possuir o atributo `data-testid=${index}-ingredient-step`, a verificação será feita pelo length do atributo.
// * O elemento de instruções deve possuir o atributo `data-testid="instructions"`;
// * O botão para finalizar a receita deve possuir o atributo `data-testid="finish-recipe-btn"`.

import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import ContextRecipes from '../context/ContextRecipes';
import useFetchIdAndRecomendations from '../Hooks/fetchDetailsAndRecomendations';
import shareIcon from '../images/shareIcon.svg';
import FavoriteFood from '../components/FavoriteFood';
import './detalhes.css';
import RecipeMealsButton from '../components/RecipeMealsButton';

function InProgressComida() {
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

    const ingredientsFiltered = ingredients.filter((ingredient) => (ingredient !== '' && ingredient !== null));
    console.log('toaqui', ingredientsFiltered);

    return (
      <div>
        { ingredientsFiltered.map((ingredient, index) => (
          (
            <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              <div data-testid={ `${index}-ingredient-step` }>
                <input
                  className="thought"
                  id={ `ingredient-${index}` }
                  type="checkbox"
                  value={ ingredient }
                  name={ ingredient }
                />
                <label htmlFor={ `ingredient-${index}` } className="finish">
                  {' '}
                  {ingredient}
                  {' '}
                  {measures[index]}
                  {' '}
                </label>
              </div>
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
              <div>
                <button type="button" onClick={ () => sharing() }>
                  <img src={ shareIcon } alt="shareIcon" data-testid="share-btn" />
                </button>
                <p className={ shared }>Link copiado!</p>
              </div>
              {' '}
              <FavoriteFood />

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
            <button type="button" data-testid="finish-recipe-btn">
              Finalizar Receita
            </button>
          </div>)
        : <h1> Loading...</h1>}
    </div>
  );
}

export default InProgressComida;
