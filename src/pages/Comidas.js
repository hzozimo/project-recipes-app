import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContextRecipes from '../context/ContextRecipes';
import useFetchInicialFoods from '../Hooks/fetchInicialFoods';

function Comidas() {
  const ONZE = 11;
  Comidas.displayName = 'Comidas';
  const { data } = useContext(ContextRecipes);
  useFetchInicialFoods();

  const dataAux = { ...data };
  const { meals } = dataAux;
  console.log(meals);

  const loadingFunc = () => (<div>..Loading...</div>);
  const dataRender = () => (
    <div>
      {meals && meals.slice(0, ONZE).map((food) => (
        <div key={ food.idMeal }>
          <span>{food.strMeal}</span>
        </div>))}
    </div>);

  return (
    <div>
      <Header title={ Comidas.displayName } />
      <h1>Comidas</h1>
      <div>
        {!data.meals ? loadingFunc() : dataRender()}
      </div>
      <Footer />
    </div>
  );
}

export default Comidas;
