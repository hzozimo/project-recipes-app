import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useFetchDrinksIngredients from '../Hooks/fetchDrinkIngredients';

function IngredientesBebidas() {
  IngredientesBebidas.displayName = 'Explorar Ingredientes: Bebidas';
  const DOZE = 12;
  const history = useHistory();
  const { drinkIngredients, setCurrentValueDrink } = useContext(ContextRecipes);
  useFetchDrinksIngredients();

  const loadingFunc = () => (<div>..Loading...</div>);
  const dataRender = () => {
    const drinkIngredientsAUX = { ...drinkIngredients };
    const { drinks } = drinkIngredientsAUX;
    return (
      <div className="explorer-container mb-5 pb-5">
        { drinks && drinks.slice(0, DOZE).map((ingredient, index) => (
          <button
            className="ingredients-button-app m-1 pb-5"
            type="button"
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            onClick={ () => {
              setCurrentValueDrink(ingredient.strIngredient1);
              history.push('/bebidas');
            } }
          >
            <img
              className="explorer-img-app"
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              alt={ ingredient.strIngredient1 }
            />
            <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient1}</p>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Header title={ IngredientesBebidas.displayName } />
      <div>
        {!drinkIngredients ? loadingFunc() : dataRender()}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default IngredientesBebidas;
