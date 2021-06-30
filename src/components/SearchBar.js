import React, { useState, useContext } from 'react';
import apiRequest from '../service/service';
import ContextRecipes from '../context/ContextRecipes';

function SearchBar() {
  const [selectedRadioButton, setSelectedRadioButton] = useState('ingrediente');
  const [searchText, setSearchText] = useState('');
  const { setData } = useContext(ContextRecipes);

  function alertJoke() {
    const alert = SearchBar.customAlert;
    alert('Sua busca deve conter somente 1 (um) caracter');
  }

  async function apiChoose() {
    const SIZE_SEARCH = Number(searchText.length);
    if (SIZE_SEARCH > 1) {
      alertJoke();
    }
    const response = await apiRequest(selectedRadioButton, searchText);
    setData(response);
  }

  // Falta apenas a Lǵica do alert caso para caso a a opção primeira letra
  // seja selecionada!
  // function alertFirstLetter() {
  //   return (alert('Sua busca deve conter somente 1 (um) caracter'));
  // }

  // function firstLetter({ target: { value } }) {
  //   const SIZE_ONE = Number(searchText.length);
  //   setSelectedRadioButton(value);
  //   if (SIZE_ONE > 1) {
  //     alertFirstLetter();
  //   }
  // }

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
