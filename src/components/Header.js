import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const [searchForm, setSearchForm] = useState(false);
  const renderSearchImage = () => (
    <button
      type="button"
      onClick={ () => setSearchForm(!searchForm) }
    >
      <img
        src={ searchIcon }
        alt="Profile"
        data-testid="search-top-btn"
      />
    </button>
  );

  return (
    <header>
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="Profile"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
      {/* mudar essa rota abaixo */}
      { title === 'Comidas'
       || title === 'Bebidas'
       || title === 'Explorar Origem' ? renderSearchImage() : false }
      { searchForm
        ? (
          <form>
            <input type="text" name="searchtext" data-testid="search-input" />
            <label htmlFor="ingrediente">
              <input
                type="radio"
                id="ingrediente"
                value="ingrediente"
                name="serchType"
                data-testid="ingredient-search-radio"
              />
              Ingrediente
            </label>
            <label htmlFor="nome">
              <input type="radio" id="nome" value="nome" name="serchType" />
              Nome
            </label>
            <label htmlFor="primeiraLetra">
              <input
                type="radio"
                id="primeiraLetra"
                value="primeiraLetra"
                name="serchType"
                data-testid="first-letter-search-radio"
              />
              Primeira Letra
            </label>
            <button type="button">Buscar</button>
          </form>
        )
        : false}
    </header>

  );
}

export default Header;

Header.propTypes = {
  title: propTypes.string.isRequired,
};
