import React, { useContext } from 'react';
import ContextRecipes from '../context/ContextRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteFood() {
  const { foodDetails,
    favorited,
    setFavorited } = useContext(ContextRecipes);

  const favoriteClick = () => {
    const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorited) {
      const newFavorites = allFavorites.filter((meal) => meal
        .id !== foodDetails.meals[0].idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setFavorited(!favorited);
    } else {
      const sendFavorites = {
        id: foodDetails.meals[0].idMeal,
        type: 'comida',
        area: foodDetails.meals[0].strArea,
        category: foodDetails.meals[0].strCategory,
        alcoholicOrNot: '',
        name: foodDetails.meals[0].strMeal,
        image: foodDetails.meals[0].strMealThumb,
      };
      if (allFavorites) {
        allFavorites.push(sendFavorites);
        localStorage.setItem('favoriteRecipes', JSON.stringify(allFavorites));
        setFavorited(!favorited);
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([sendFavorites]));
        setFavorited(!favorited);
      }
    }
  };
  return (
    <button type="button" onClick={ () => favoriteClick() }>
      <img
        src={ (favorited) ? blackHeartIcon : whiteHeartIcon }
        alt="fovorited"
        data-testid="favorite-btn"
      />
    </button>
  );
}

export default FavoriteFood;
