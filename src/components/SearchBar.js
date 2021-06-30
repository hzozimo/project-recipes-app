import React from 'react';

const SearchBar = () => (
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
      <input
        type="radio"
        id="nome"
        value="nome"
        name="serchType"
        data-testid="name-search-radio"
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
      />
      Primeira Letra
    </label>
    <button type="button" data-testid="exec-search-btn">Buscar</button>
  </form>
);

export default SearchBar;
