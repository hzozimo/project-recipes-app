import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContextRecipes from '../context/ContextRecipes';
import useFetchInicialDrinks from '../Hooks/fetchInicialDrinks';
import FilterBar from '../components/FilterBar';
// import { Button } from 'bootstrap';

function Bebidas() {
  const DOZE = 12;
  Bebidas.displayName = 'Bebidas';
  const { dataDrink } = useContext(ContextRecipes);
  useFetchInicialDrinks();

  const dataAux = { ...dataDrink };
  const { drinks } = dataAux;

  const loadingFunc = () => (<div>..Loading...</div>);
  const dataRender = () => (
    <div>
      { drinks && drinks.slice(0, DOZE).map((drink, index) => (
        <Link to={ `/bebidas/${drink.idDrink}` } key={ drink.idDrink }>
          <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
            <img
              width="200px"
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
          </div>
        </Link>
      ))}
    </div>);

  return (
    <div>
      <Header title={ Bebidas.displayName } />
      <FilterBar title={ Bebidas.displayName } />
      <div>
        {!dataDrink.drinks ? loadingFunc() : dataRender()}
      </div>
      <Footer />
    </div>
  );
}

export default Bebidas;
