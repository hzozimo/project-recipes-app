import { useEffect, useContext } from 'react';
// import { filterDrinksBtn, filterMealsBtn } from '../api/fetchFilterBtn';
import ContextRecipes from '../context/ContextRecipes';
import apiRequest from '../service/service';
import drinkRequest from '../service/drinkservice';

const useInicialFilters = (title) => {
  const {
    setData,
    setDataDrink,
    currentValueFood,
    currentValueDrink,
  } = useContext(ContextRecipes);

  useEffect(() => {
    if (title === 'Comidas' && currentValueFood !== null) {
      apiRequest('ingrediente', currentValueFood)
        .then((res) => setData(res));
    }
    if (title === 'Bebidas' && currentValueDrink !== null) {
      drinkRequest('ingrediente', currentValueDrink)
        .then((res) => setDataDrink(res));
    }
  }, []);
};

export default useInicialFilters;
