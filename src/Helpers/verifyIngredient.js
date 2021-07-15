const verifyIngredient = (ingredient, loadInProgressRecipes, id, type) => {
  if (loadInProgressRecipes !== null
    && loadInProgressRecipes[type] !== undefined
      && loadInProgressRecipes[type][id]) {
    return loadInProgressRecipes[type][id].includes(ingredient);
  }
  return false;
};

export default verifyIngredient;
