async function apiRequest(radio, text) {
  if (radio === 'ingrediente') {
    const ingrediente = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`);
    return ingrediente.json();
  }
  if (radio === 'primeiraLetra') {
    const primeiraLetra = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`);
    return primeiraLetra.json();
  }
  if (radio === 'nome') {
    const nome = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`);
    return nome.json();
  }
}

export default apiRequest;
