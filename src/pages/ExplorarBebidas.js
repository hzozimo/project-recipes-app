import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarBebidas() {
  ExplorarBebidas.displayName = 'Explorar Bebidas';
  const history = useHistory();
  async function randomFetchDrink() {
    const randomDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const randomDrinkJSON = await randomDrink.json();
    return history.push(`/bebidas/${randomDrinkJSON.drinks[0].idDrink}`);
  }
  return (
    <div>
      <Header title={ ExplorarBebidas.displayName } />
      <Button
        className="btn btn-dark btn-sm m-3 p-3"
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('bebidas/ingredientes') }
      >
        Por Ingredientes
      </Button>
      <Button
        className="btn btn-danger btn-sm m-3 p-3"
        type="button"
        data-testid="explore-surprise"
        onClick={ () => randomFetchDrink() }
      >
        Me Surpreenda!
      </Button>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
