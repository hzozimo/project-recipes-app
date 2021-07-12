import React, { useContext } from 'react';
import ContextRecipes from '../context/ContextRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useFetchDrinksIngredients from '../Hooks/fetchDrinkIngredients';
// import handlerFilter from '../Helpers/handleFilter';

function IngredientesBebidas() {
  IngredientesBebidas.displayName = 'Explorar Ingredientes: Bebidas';
  const DOZE = 12;
  const { drinkIngredients } = useContext(ContextRecipes);
  useFetchDrinksIngredients();

  const loadingFunc = () => (<div>..Loading...</div>);
  const dataRender = () => {
    const drinkIngredientsAUX = { ...drinkIngredients };
    const { drinks } = drinkIngredientsAUX;
    return (
      <div>
        { drinks && drinks.slice(0, DOZE).map((drink, index) => (
          <div data-testid={ `${index}-ingredient-card` } key={ index }>
            <img
              width="200px"
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
              alt={ drink.strIngredient1 }
            />
            <p data-testid={ `${index}-card-name` }>{drink.strIngredient1}</p>
          </div>
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
      <Footer />
    </div>
  );
}

export default IngredientesBebidas;
