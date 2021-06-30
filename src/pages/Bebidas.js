import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Bebidas() {
  Bebidas.displayName = 'Bebidas';
  return (
    <div>
      <Header title={ Bebidas.displayName } />
      <h1>Bebidas</h1>
      <Footer />
    </div>
  );
}

export default Bebidas;
