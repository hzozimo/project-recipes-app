import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ReceitasFavoritas() {
  const [typeToRender, setTypeToRender] = useState('All');
  const [reload, setReaload] = useState(true);
  const [shared, setShared] = useState('escondido');

  const saveTypeToRender = (event) => {
    const { value } = event.target;
    if (value === 'All') setTypeToRender(value);
    if (value === 'Food') setTypeToRender('comida');
    if (value === 'Drinks') setTypeToRender('bebida');
  };
  const disfavor = (type, id) => {
    const myFavoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = myFavoritesRecipes.filter((favoriteRecipes) => favoriteRecipes
      .id !== id && favoriteRecipes.type !== type);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setReaload(!reload);
  };

  const sharing = (type, id) => {
    const numberOfCharactersToRemove = '/receitas-favoritas'.length;
    const url = window.location.href;
    let link = url.substring(0, url.length - numberOfCharactersToRemove);
    if (type === 'comida') {
      link += `/comidas/${id}`;
    }
    if (type === 'bebida') {
      link += `/bebidas/${id}`;
    }
    copy(link);
    setShared('aparente');
  };

  const renderFavorites = () => {
    const screen = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let screenFiltered = screen;
    if (typeToRender !== 'All') {
      screenFiltered = screen.filter((recipe) => recipe.type === typeToRender);
    }
    const alterURL = {
      comida: 'comidas',
      bebida: 'bebidas',
    };
    return (
      <div>
        {screenFiltered && screenFiltered.map((favoriteRecipes, index) => (
          <div key={ favoriteRecipes.id }>
            <Link to={ `/${alterURL[favoriteRecipes.type]}/${favoriteRecipes.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                width="200px"
                src={ favoriteRecipes.image }
                alt={ favoriteRecipes.name }
              />
            </Link>
            {favoriteRecipes.type === 'comida'
              ? (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${favoriteRecipes.area} - ${favoriteRecipes.category}`}
                </p>)
              : (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${favoriteRecipes.alcoholicOrNot}`}
                </p>)}
            <Link to={ `/${alterURL[favoriteRecipes.type]}/${favoriteRecipes.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{ favoriteRecipes.name }</p>
            </Link>
            <button
              type="button"
              onClick={ () => sharing(favoriteRecipes.type, favoriteRecipes.id) }
            >
              <img
                src={ shareIcon }
                alt="shareIcon"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <p className={ shared }>Link copiado!</p>
            <button
              type="button"
              onClick={ () => disfavor(favoriteRecipes.type, favoriteRecipes.id) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="favorite"
              />
            </button>

          </div>
        )) }
      </div>);
  };

  const renderFilterButtons = () => {
    const buttons = ['All', 'Food', 'Drinks'];
    const dataTest = ['filter-by-all-btn', 'filter-by-food-btn', 'filter-by-drink-btn'];
    return (
      <div>
        {buttons.map((button, index) => (
          <button
            type="button"
            key={ index }
            value={ button }
            data-testid={ dataTest[index] }
            onClick={ (event) => saveTypeToRender(event) }
          >
            {button}
          </button>
        ))}
      </div>);
  };

  ReceitasFavoritas.displayName = 'Receitas Favoritas';
  return (
    <div>
      <header>
        <Header title={ ReceitasFavoritas.displayName } />
      </header>
      <body>
        { renderFilterButtons() }
        {renderFavorites()}

      </body>
    </div>
  );
}

export default ReceitasFavoritas;
.