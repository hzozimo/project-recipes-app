import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useFetchFoodsIngredients from '../Hooks/fetchFoodIngredients';

function IngredientesComidas() {
  IngredientesComidas.displayName = 'Explorar Ingredientes: Comidas';
  const DOZE = 12;
  const history = useHistory();
  const { foodIngredients, setCurrentValueFood } = useContext(ContextRecipes);
  useFetchFoodsIngredients();

  const loadingFunc = () => (<div>..Loading...</div>);
  const dataRender = () => {
    const foodIngredientsAUX = { ...foodIngredients };
    const { meals } = foodIngredientsAUX;
    return (
      <div className="explorer-container mb-5 pb-5">
        { meals && meals.slice(0, DOZE).map((ingredient, index) => (
          <button
            className="ingredients-button-app m-1 pb-5"
            type="button"
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            onClick={ () => {
              setCurrentValueFood(ingredient.strIngredient);
              history.push('/comidas');
            } }
          >
            <p
              data-testid={ `${index}-card-name` }
            >
              {ingredient.strIngredient}
            </p>
            <img
              className="explorer-img-app"
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              alt={ ingredient.strIngredient }
            />
          </button>
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
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default IngredientesComidas;
