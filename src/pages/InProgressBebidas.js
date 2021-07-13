import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import ContextRecipes from '../context/ContextRecipes';
import useFetchIdAndRecomendations from '../Hooks/fetchDetailsAndRecomendations';
import shareIcon from '../images/shareIcon.svg';
import FavoriteDrink from '../components/FavoriteDrink';
import './detalhes.css';
import verifyIngredient from '../Helpers/verifyIngredient';
import Loading from '../components/Loading';

function InProgressBebida() {
  const history = useHistory();
  const { id } = useParams();
  const [shared, setShared] = useState('escondido');
  const [canFinalize, setCanFinalize] = useState(true);
  const { drinkDetails,
    loadInProgressRecipes,
  } = useContext(ContextRecipes);

  useFetchIdAndRecomendations(id, 'drinks');

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
        const inProgressRecipesToSave = {
          ...inProgressRecipes,
          cocktails: {
            [id]: [...inProgressRecipes.cocktails[id], event.target.name],
          },
        };
        localStorage
          .setItem('inProgressRecipes', JSON.stringify(inProgressRecipesToSave));
      } else {
        const inProgressRecipesToSave = {
          cocktails: {
            [id]: [event.target.name],
          },
        };
        localStorage
          .setItem('inProgressRecipes', JSON.stringify(inProgressRecipesToSave));
      }
    } else {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const ingredientsDone = inProgressRecipes.cocktails[id];
      const removindIngredient = ingredientsDone
        .filter((ingredient) => ingredient !== event.target.name);
      const inProgressRecipesToSave = {
        ...inProgressRecipes,
        cocktails: {
          [id]: removindIngredient,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipesToSave));
    }
    isDisabled();
  };

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
                    verifyIngredient(ingredient, loadInProgressRecipes, id, 'cocktails')
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
    // const finalizedRecipe = {
    //   id: drinkDetails.drinks[0].idDrink,
    //   type: '',
    //   area: '',
    //   category: drinkDetails.drinks[0].strCategory,
    //   alcoholicOrNot: drinkDetails.drinks[0].strAlcoholic,
    //   name: drinkDetails.drinks[0].strDrink,
    //   image: drinkDetails.drinks[0].strDrinkThumb,
    //   doneDate: new Date(),
    //   tags: drinkDetails.drinks[0].strTags,
    // };
    // if (localStorage.getItem('doneRecipes')) {
    //   const recipesSaved = JSON.parse(localStorage.getItem('doneRecipes'));
    //   recipesSaved.push(finalizedRecipe);
    //   localStorage.setItem('doneRecipes', JSON.stringify(recipesSaved));
    // } else {
    //   localStorage.setItem('doneRecipes', JSON.stringify(finalizedRecipe));
    // }
    history.push('/receitas-feitas');
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
            <h4 data-testid="recipe-category">
              {' '}
              { drinkDetails.drinks[0].strCategory }
              {' '}
            </h4>
            <h5>
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
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ canFinalize }
              onClick={ () => finalize() }
            >
              Finalizar Receita
            </button>
          </div>)
        : <Loading /> }
    </div>
  );
}

export default InProgressBebida;
