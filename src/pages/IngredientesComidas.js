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
      <div className="explorer-container">
        { meals && meals.slice(0, DOZE).map((ingredient, index) => (
          <div key={ index } className="card-body">
            <button
              type="button"
              data-testid={ `${index}-ingredient-card` }
              key={ index }
              onClick={ () => {
                setCurrentValueFood(ingredient.strIngredient);
                history.push('/comidas');
              } }
            >
              <p
                className="card-title"
                data-testid={ `${index}-card-name` }
              >
                {ingredient.strIngredient}
              </p>
              <img
                className="card-img-top"
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                alt={ ingredient.strIngredient }
              />
            </button>
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
