import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContextRecipes from '../context/ContextRecipes';
import useFetchInicialFoods from '../Hooks/fetchInicialFoods';

function Comidas() {
  Comidas.displayName = 'Comidas';
  const { data } = useContext(ContextRecipes);
  useFetchInicialFoods();

  const dataAux = { ...data };
  const { meals } = dataAux;
  console.log(meals);

  const loadingFunc = () => (<div>..Loading...</div>);
  const dataRender = () => (
    <div>
      {meals.map((food) => (
        <div key={ food.idMeal }>
          <span>{food.strMeal}</span>
        </div>))}
    </div>);

  return (
    <div>
      <Header title={ Comidas.displayName } />
      <h1>Comidas</h1>
      <div>
        {Object.keys(data).length === 0 ? loadingFunc() : dataRender()}
      </div>
      <Footer />
    </div>
  );
}

export default Comidas;
