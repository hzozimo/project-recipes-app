import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';
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
      const response = await apiRequest(selectedRadioButton, searchText);
      if (response.meals === null) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (response.meals.length === 1) {
        history.push(`/comidas/${response.meals[0].idMeal}`);
      }
      setData(response);
      setLoading(false);
    }
    if (title === 'Bebidas') {
      const response = await drinkRequest(selectedRadioButton, searchText);
      if (response.drinks === null) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (response.drinks.length === 1) {
        history.push(`/bebidas/${response.drinks[0].idDrink}`);
      }
      setDataDrink(response);
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
      <Button
        className="btn btn-success btn-sm m-3 p-3"
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => apiChoose() }
      >
        Buscar
      </Button>
    </form>);
}

SearchBar.propTypes = {
  title: propTypes.string.isRequired,

};

export default SearchBar;
