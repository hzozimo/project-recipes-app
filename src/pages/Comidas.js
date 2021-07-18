import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContextRecipes from '../context/ContextRecipes';
import useFetchInicialFoods from '../Hooks/fetchInicialFoods';
import FilterBar from '../components/FilterBar';
import Loading from '../components/Loading';

function Comidas() {
  const DOZE = 12;
  Comidas.displayName = 'Comidas';
  const { data } = useContext(ContextRecipes);
  useFetchInicialFoods();

  const dataAux = { ...data };
  const { meals } = dataAux;

  const loadingFunc = () => (
    <Loading />
  );
  const dataRender = () => (
    <div className="container-recipes-app">
      { meals && meals.slice(0, DOZE).map((food, index) => (
        <div
          key={ index }
          className="bg-color card-app-size text-center"
        >
          <Link
            className="card-body"
            to={ `/comidas/${food.idMeal}` }
            key={ food.idMeal }
          >
            <div
              className="text-light"
              data-testid={ `${index}-recipe-card` }
              key={ food.idMeal }
            >
              <img
                className="card-img-top img-foods-app"
                data-testid={ `${index}-card-img` }
                src={ food.strMealThumb }
                alt={ food.strMeal }
              />
              <p
                className="card-title"
                data-testid={ `${index}-card-name` }
              >
                {food.strMeal}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>);

  return (
    <>
      <div className="pb-5">
        <Header title={ Comidas.displayName } />
        <FilterBar title={ Comidas.displayName } />
        <div>
          {!data.meals ? loadingFunc() : dataRender()}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Comidas;
