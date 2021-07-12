import React, { useContext } from 'react';
import ContextRecipes from '../context/ContextRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useFetchFoodsIngredients from '../Hooks/fetchFoodIngredients';

function IngredientesComidas() {
  IngredientesComidas.displayName = 'Explorar Ingredientes';
  const DOZE = 12;
  const { foodIngredients } = useContext(ContextRecipes);
  useFetchFoodsIngredients();

  const loadingFunc = () => (<div>..Loading...</div>);
  const dataRender = () => {
    const foodIngredientsAUX = { ...foodIngredients };
    const { meals } = foodIngredientsAUX;
    return (
      <div>
        { meals && meals.slice(0, DOZE).map((ingredient, index) => (
          <div data-testid={ `${index}-ingredient-card` } key={ ingredient.idIngredient }>
            <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient}</p>
            <img
              width="200px"
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png` }
              alt={ ingredient.strIngredient }
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Header title={ IngredientesComidas.displayName } />
      <div>
        {!foodIngredients ? loadingFunc() : dataRender()}
      </div>
      <Footer />
    </div>
  );
}

export default IngredientesComidas;
