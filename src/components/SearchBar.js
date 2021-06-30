import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import apiRequest from '../service/service';
import ContextRecipes from '../context/ContextRecipes';

function SearchBar({ title }) {
  const [selectedRadioButton, setSelectedRadioButton] = useState('ingrediente');
  const [searchText, setSearchText] = useState('');
  const { setData, setLoading } = useContext(ContextRecipes);

  const customAlert = (fn, msg) => {
    fn(msg);
  };

  // RESOLVIDO PROBLEM DE LINT RESOLVENDO PROBLEMAS DE ASSINCRONICIDADE COM LOADING
  async function apiChoose(titleParams) {
    const SIZE_SEARCH = Number(searchText.length);
    if (SIZE_SEARCH > 1 && selectedRadioButton === 'primeiraLetra') {
      customAlert(alert, 'Sua busca deve conter somente 1 (um) caracter');
    }
    setLoading(true);
    if (titleParams === 'Comida') {
      const response = await apiRequest(selectedRadioButton, searchText);
      setData(response);
      setLoading(false);
    }
    if (titleParams === 'Bebida') {
      const response = await apiRequest(selectedRadioButton, searchText);
      setData(response);
      setLoading(false);
    }
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
        onClick={ () => apiChoose(title) }
      >
        Buscar
      </button>
    </form>);
}

SearchBar.propTypes = {
  title: propTypes.string.isRequired,

};

export default SearchBar;
