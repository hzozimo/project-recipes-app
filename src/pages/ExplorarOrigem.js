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
    <div>
      { meals && meals.slice(0, DOZE).map((food, index) => (
        <Link to={ `/comidas/${food.idMeal}` } key={ food.idMeal }>
          <div data-testid={ `${index}-recipe-card` } key={ food.idMeal }>
            <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
            <img
              width="200px"
              data-testid={ `${index}-card-img` }
              src={ food.strMealThumb }
              alt={ food.strMeal }
            />
          </div>
        </Link>
      ))}
    </div>);

  return (
    <div>
      <Header title={ ExplorarOrigem.displayName } />
      <AreaBar />
      <div>
        {!data ? loadingFunc() : dataRender()}
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarOrigem;
