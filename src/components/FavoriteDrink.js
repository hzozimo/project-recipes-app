import React, { useContext } from 'react';
import ContextRecipes from '../context/ContextRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteDrink() {
  const { drinkDetails,
    favorited,
    setFavorited } = useContext(ContextRecipes);
  const favoriteClick = () => {
    const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorited) {
      const newFavorites = allFavorites.filter((drink) => drink
        .id !== drinkDetails.drinks[0].idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setFavorited(!favorited);
    } else {
      const sendFavorites = {
        id: drinkDetails.drinks[0].idDrink,
        type: 'bebida',
        area: '',
        category: drinkDetails.drinks[0].strCategory,
        alcoholicOrNot: drinkDetails.drinks[0].strAlcoholic,
        name: drinkDetails.drinks[0].strDrink,
        image: drinkDetails.drinks[0].strDrinkThumb,
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

export default FavoriteDrink;
