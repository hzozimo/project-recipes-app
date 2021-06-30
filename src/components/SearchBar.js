import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import apiRequest from '../service/service';
import ContextRecipes from '../context/ContextRecipes';
import drinkRequest from '../service/drinkservice';

function SearchBar({ title }) {
  const [selectedRadioButton, setSelectedRadioButton] = useState('ingrediente');
  const [searchText, setSearchText] = useState('');
  const { setData, setLoading, setDataDrink } = useContext(ContextRecipes);
  const history = useHistory();

  const customAlert = (fn, msg) => {
    fn(msg);
  };

  // RESOLVIDO PROBLEM DE LINT RESOLVENDO PROBLEMAS DE ASSINCRONICIDADE COM LOADING
  async function apiChoose() {
    const SIZE_SEARCH = Number(searchText.length);
    if (SIZE_SEARCH > 1 && selectedRadioButton === 'primeiraLetra') {
      customAlert(alert, 'Sua busca deve conter somente 1 (um) caracter');
    }
    setLoading(true);
    if (title === 'Comidas') {
      console.log('cheguei aqui', title);
      const response = await apiRequest(selectedRadioButton, searchText);
      if (response.meals.length === 1) {
        history.push(`/comidas/${response.meals[0].idMeal}`);
      }
      setData(response);
      setLoading(false);
    }
    if (title === 'Bebidas') {
      console.log('cheguei aqui', title);
      const response = await drinkRequest(selectedRadioButton, searchText);
      if (response.drinks.length === 1) {
        history.push(`/bebidas/${response.drinks[0].idDrink}`);
      }
      console.log(response.drinks);
      setDataDrink(response);
      // Verificar o tamanho do array
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
        onClick={ () => apiChoose() }
      >
        Buscar
      </button>
    </form>);
}

SearchBar.propTypes = {
  title: propTypes.string.isRequired,

};

export default SearchBar;
