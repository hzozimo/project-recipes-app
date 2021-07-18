import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AreaBar from '../components/AreaBar';
import useFetchInicialFoods from '../Hooks/fetchInicialFoods';
import ContextRecipes from '../context/ContextRecipes';

function ExplorarOrigem() {
  ExplorarOrigem.displayName = 'Explorar Origem';
  const DOZE = 12;
  const { data } = useContext(ContextRecipes);
  useFetchInicialFoods();

  const dataAux = { ...data };
  const { meals } = dataAux;

  console.log(data);
  const loadingFunc = () => (<div>..Loading...</div>);
  const dataRender = () => (
    <div className="container-recipes-app p-5">
      { meals && meals.slice(0, DOZE).map((food, index) => (
        <div key={ index } className="bg-color card-app-size text-center">
          <Link
            className="card-body"
            to={ `/comidas/${food.idMeal}` }
            key={ food.idMeal }
          >
            <div data-testid={ `${index}-recipe-card` } key={ food.idMeal }>
              <p
                className="title-foods-app card-title"
                data-testid={ `${index}-card-name` }
              >
                {food.strMeal}
              </p>
              <img
                className="card-img-top img-foods-app"
                data-testid={ `${index}-card-img` }
                src={ food.strMealThumb }
                alt={ food.strMeal }
              />
            </div>
          </Link>
        </div>
      ))}
    </div>);

  return (
    <div>
      <Header title={ ExplorarOrigem.displayName } />
      <AreaBar />
      <div>
        {!data ? loadingFunc() : dataRender()}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default ExplorarOrigem;
