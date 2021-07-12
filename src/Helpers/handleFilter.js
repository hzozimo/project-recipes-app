// import { useContext, useState } from 'react';
// import propTypes from 'prop-types';
// import ContextRecipes from '../context/ContextRecipes';
// import { filterMealsBtn, filterDrinksBtn } from '../api/fetchFilterBtn';

// function useHandlerFilter(event, title, currentValue, setCurrentValue, setData,
//   setDataDrink) {
//   // const {
//   //   setData,
//   //   setDataDrink,
//   // } = useContext(ContextRecipes);

//   // const [currentValue, setCurrentValue] = useState();

//   if (title.includes('Comidas')) {
//     if (value !== currentValue) {
//       filterMealsBtn(value)
//         .then((res) => setData(res));
//       setCurrentValue(value);
//     } else {
//       fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
//         .then((res) => res.json())
//         .then((res) => {
//           setData(res);
//         });
//       setCurrentValue(null);
//     }
//   }
//   if (title.includes('Bebidas')) {
//     if (value !== currentValue) {
//       filterDrinksBtn(value)
//         .then((res) => setDataDrink(res));
//       setCurrentValue(value);
//     } else {
//       fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
//         .then((res) => res.json())
//         .then((res) => {
//           setDataDrink(res);
//         });
//       setCurrentValue(null);
//     }
//   }
// }

// FilterBar.propTypes = {
//   title: propTypes.string.isRequired,
// };

// export default useHandlerFilter;
