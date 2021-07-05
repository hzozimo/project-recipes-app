import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContextRecipes from '../context/ContextRecipes';
import useFetchInicialDrinks from '../Hooks/fetchInicialDrinks';
import FilterBar from '../components/FilterBar';

function Bebidas() {
  const DOZE = 12;
  Bebidas.displayName = 'Bebidas';
  const { dataDrink } = useContext(ContextRecipes);
  useFetchInicialDrinks();

  const dataAux = { ...dataDrink };
  const { drinks } = dataAux;
  // console.log(drinks);

  const loadingFunc = () => (<div>..Loading...</div>);
  const dataRender = () => (
    <div>
      { drinks && drinks.slice(0, DOZE).map((drink, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
          <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
          <img
            width="200px"
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
        </div>))}
    </div>);

  return (
    <div>
      <Header title={ Bebidas.displayName } />
      {/* <h1>Bebidas</h1> */}
      <FilterBar title={ Bebidas.displayName } />
      <div>
        {!dataDrink.drinks ? loadingFunc() : dataRender()}
      </div>
      <Footer />
    </div>
  );
}

export default Bebidas;
