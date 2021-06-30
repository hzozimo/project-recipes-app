import React, { useState, useContext } from 'react';
import apiRequest from '../service/service';
import ContextRecipes from '../context/ContextRecipes';

function SearchBar() {
  const [selectedRadioButton, setSelectedRadioButton] = useState('ingrediente');
  const [searchText, setSearchText] = useState('');
  const { setData } = useContext(ContextRecipes);

  async function apiChoose() {
    const response = await apiRequest(selectedRadioButton, searchText);
    setData(response);
  }

  return (
    <form>
      <input
        type="text"
        name="searchtext"
        data-testid="search-input"
        onChange={ ({ target: { value } }) => setSearchText(value) }
      />
      <label htmlFor="ingrediente">
        <input
          type="radio"
          id="ingrediente"
          value="ingrediente"
          name="serchType"
          data-testid="ingredient-search-radio"
          onChange={ ({ target: { value } }) => setSelectedRadioButton(value) }
        />
        Ingrediente
      </label>
      <label htmlFor="nome">
        <input
          type="radio"
          id="nome"
          value="nome"
          name="serchType"
          data-testid="name-search-radio"
          onChange={ ({ target: { value } }) => setSelectedRadioButton(value) }
        />
        Nome
      </label>
      <label htmlFor="primeiraLetra">
        <input
          type="radio"
          id="primeiraLetra"
          value="primeiraLetra"
          name="serchType"
          data-testid="first-letter-search-radio"
          onChange={ ({ target: { value } }) => setSelectedRadioButton(value) }
        />
        Primeira Letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => apiChoose() }
      >
        Buscar
      </button>
    </form>);
}

export default SearchBar;
