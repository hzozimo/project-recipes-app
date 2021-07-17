import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContextRecipes from '../context/ContextRecipes';
import useFetchInicialDrinks from '../Hooks/fetchInicialDrinks';
import FilterBar from '../components/FilterBar';
import Loading from '../components/Loading';

function Bebidas() {
  const DOZE = 12;
  Bebidas.displayName = 'Bebidas';
  const { dataDrink } = useContext(ContextRecipes);
  useFetchInicialDrinks();

  const dataAux = { ...dataDrink };
  const { drinks } = dataAux;

  const loadingFunc = () => (
    <Loading />
  );
  const dataRender = () => (
    <div
      className="container-recipes-app"
    >
      { drinks && drinks.slice(0, DOZE).map((drink, index) => (
        <div
          key={ index }
          className="bg-color card-app-size m-3 text-center"
        >
          <Link
            className="card-body"
            to={ `/bebidas/${drink.idDrink}` }
            key={ drink.idDrink }
          >
            <div
              className="text-light"
              data-testid={ `${index}-recipe-card` }
              key={ drink.idDrink }
            >
              <img
                className="card-img-top"
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <p
                className="card-title"
                data-testid={ `${index}-card-name` }
              >
                {drink.strDrink}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>);

  return (
    <>
      <div className="pb-5">
        <Header title={ Bebidas.displayName } />
        <FilterBar title={ Bebidas.displayName } />
        <div>
          {!dataDrink.drinks ? loadingFunc() : dataRender()}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Bebidas;
