import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import ContextRecipes from '../context/ContextRecipes';
import useFetchIdAndRecomendations from '../Hooks/fetchDetailsAndRecomendations';
import shareIcon from '../images/shareIcon.svg';
import FavoriteFood from '../components/FavoriteFood';
import './detalhes.css';
import verifyIngredient from '../Helpers/verifyIngredient';

function InProgressComida() {
  const history = useHistory();
  const { id } = useParams();
  const [shared, setShared] = useState('escondido');
  const [canFinalize, setCanFinalize] = useState(true);
  const { foodDetails,
    loadInProgressRecipes,
  } = useContext(ContextRecipes);

  useFetchIdAndRecomendations(id, 'foods');

  const isDisabled = () => {
    const allCheckBoxes = document.getElementsByClassName('thought');
    const allCheckBoxesArray = [...allCheckBoxes];
    const result = allCheckBoxesArray.every((el) => el.checked === true);
    setCanFinalize(!result);
  };

  const handleChange = (event) => {
    if (event.target.checked) {
      if (localStorage.getItem('inProgressRecipes')) {
        const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
        if (inProgressRecipes.meals && inProgressRecipes.meals[id]) {
          const inProgressRecipesToSave = {
            ...inProgressRecipes,
            meals: {
              [id]: [...inProgressRecipes.meals[id], event.target.name],
            },
          };
          localStorage
            .setItem('inProgressRecipes', JSON.stringify(inProgressRecipesToSave));
        } else {
          const inProgressRecipesToSave = {
            ...inProgressRecipes,
            meals: {
              [id]: [event.target.name],
            },
          };
          localStorage
            .setItem('inProgressRecipes', JSON.stringify(inProgressRecipesToSave));
        }
      } else {
        const inProgressRecipesToSave = {
          meals: {
            [id]: [event.target.name],
          },
        };
        localStorage
          .setItem('inProgressRecipes', JSON.stringify(inProgressRecipesToSave));
      }
    } else {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const ingredientsDone = inProgressRecipes.meals[id];
      const removindIngredient = ingredientsDone
        .filter((ingredient) => ingredient !== event.target.name);
      const inProgressRecipesToSave = {
        ...inProgressRecipes,
        meals: {
          [id]: removindIngredient,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipesToSave));
    }
    isDisabled();
  };

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
                  defaultChecked={
                    verifyIngredient(ingredient, loadInProgressRecipes, id, 'meals')
                  }
                  onChange={ (event) => handleChange(event) }
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
    const numberOfCharactersToRemove = '/in-progress'.length;
    const url = window.location.href;
    const link = url.substring(0, url.length - numberOfCharactersToRemove);
    copy(link);
    setShared('aparente');
  };

  const finalize = () => {
    const finalizedRecipe = {
      id: foodDetails.meals[0].idMeal,
      type: 'comida',
      area: foodDetails.meals[0].strArea,
      category: foodDetails.meals[0].strCategory,
      alcoholicOrNot: '',
      name: foodDetails.meals[0].strMeal,
      image: foodDetails.meals[0].strMealThumb,
      doneDate: new Date(),
      tags: [foodDetails.meals[0].strTags],
    };
    if (localStorage.getItem('doneRecipes')) {
      const recipesSaved = JSON.parse(localStorage.getItem('doneRecipes'));
      recipesSaved.push(finalizedRecipe);
      localStorage.setItem('doneRecipes', JSON.stringify(recipesSaved));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([finalizedRecipe]));
    }
    history.push('/receitas-feitas');
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
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ canFinalize }
              onClick={ () => finalize() }
            >
              Finalizar Receita
            </button>
          </div>)
        : <h1> Loading...</h1>}
    </div>
  );
}

export default InProgressComida;
