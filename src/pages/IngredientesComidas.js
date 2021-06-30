import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function IngredientesComidas() {
  IngredientesComidas.displayName = 'Explorar Ingredientes';
  return (
    <div>
      <Header title={ IngredientesComidas.displayName } />
      <Footer />
    </div>
  );
}

export default IngredientesComidas;
