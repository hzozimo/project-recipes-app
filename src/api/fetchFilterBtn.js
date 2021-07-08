export async function filterMealsBtn(btnCategory) {
  const ingrediente = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${btnCategory}`);
  return ingrediente.json();
}

export async function filterDrinksBtn(btnCategory) {
  const ingrediente = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${btnCategory}`);
  return ingrediente.json();
}
