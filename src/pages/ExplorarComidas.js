import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarComidas() {
  ExplorarComidas.displayName = 'Explorar Comidas';
  const history = useHistory();
  async function randomFetchMeal() {
    const randomMeal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const randomMealJSON = await randomMeal.json();
    return history.push(`/comidas/${randomMealJSON.meals[0].idMeal}`);
  }
  return (
    <div>
      <Header title={ ExplorarComidas.displayName } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('comidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('comidas/area') }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => randomFetchMeal() }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
