import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Comidas() {
  Comidas.displayName = 'Comidas';
  return (
    <div>
      <Header title={ Comidas.displayName } />
      <h1>Comidas</h1>
      <Footer />
    </div>
  );
}

export default Comidas;
