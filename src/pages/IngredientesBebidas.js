import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function IngredientesBebidas() {
  IngredientesBebidas.displayName = 'Explorar Ingredientes';
  return (
    <div>
      <Header title={ IngredientesBebidas.displayName } />
      <Footer />
    </div>
  );
}

export default IngredientesBebidas;
