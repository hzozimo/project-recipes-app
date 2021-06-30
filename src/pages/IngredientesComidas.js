import React from 'react';
import Header from '../components/Header';

function IngredientesComidas() {
  IngredientesComidas.displayName = 'Explorar Ingredientes';
  return (
    <div>
      <Header title={ IngredientesComidas.displayName } />
    </div>
  );
}

export default IngredientesComidas;
