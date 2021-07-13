export async function fetchAreas() {
  const resultsJSON = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const results = await resultsJSON.json();
  return results;
}

export async function fetchFilterAreas(area) {
  if (area !== 'All') {
    const resultsJSON = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const results = await resultsJSON.json();
    return results;
  }
  const resultsJSON = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const results = await resultsJSON.json();
  return results;
}
