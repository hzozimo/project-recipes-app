const verifyIngredient = (ingredient, loadInProgressRecipes, id, type) => {
  if (loadInProgressRecipes !== null
    && loadInProgressRecipes[type] !== undefined) {
    return loadInProgressRecipes[type][id].includes(ingredient);
  }
  return false;
};

export default verifyIngredient;
