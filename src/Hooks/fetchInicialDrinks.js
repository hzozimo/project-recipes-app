import { useState, useEffect } from 'react';

const useFetchInicialDrinks = () => {
  const [Drinks, setDrinks] = useState({});

  const fetchDrink = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka')
      .then((res) => res.json())
      .then((res) => setDrinks(res));
  };
  useEffect(fetchDrink, []);
  return Drinks;
};

export default useFetchInicialDrinks;
