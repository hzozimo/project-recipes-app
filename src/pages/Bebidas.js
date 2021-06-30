import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContextRecipes from '../context/ContextRecipes';
import useFetchInicialDrinks from '../Hooks/fetchInicialDrinks';

function Bebidas() {
  Bebidas.displayName = 'Bebidas';
  const { dataDrink } = useContext(ContextRecipes);
  useFetchInicialDrinks();

  const dataAux = { ...dataDrink };
  const { drinks } = dataAux;

  const loadingFunc = () => (<div>..Loading...</div>);
  const dataRender = () => (
    <div>
      {drinks.map((drink) => (
        <div key={ drink.idDrink }>
          <span>{drink.strDrink}</span>
        </div>))}
    </div>);

  return (
    <div>
      <Header title={ Bebidas.displayName } />
      <h1>Bebidas</h1>
      <div>
        {Object.keys(dataDrink).length === 0 ? loadingFunc() : dataRender()}
      </div>
      <Footer />
    </div>
  );
}

export default Bebidas;
