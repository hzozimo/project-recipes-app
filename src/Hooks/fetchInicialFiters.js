import { useEffect, useContext } from 'react';
import { filterDrinksBtn, filterMealsBtn } from '../api/fetchFilterBtn';
import ContextRecipes from '../context/ContextRecipes';

const useInicialFilters = (title) => {
  const {
    setData,
    setDataDrink,
    currentValueFood,
    currentValueDrink,
  } = useContext(ContextRecipes);

  useEffect(() => {
    if (title === 'Comidas' && currentValueFood !== null) {
      filterMealsBtn(currentValueFood)
        .then((res) => setData(res));
    }
    if (title === 'Bebidas' && currentValueDrink !== null) {
      filterDrinksBtn(currentValueDrink)
        .then((res) => setDataDrink(res));
    }
  }, []);
};

export default useInicialFilters;
