import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarBebidas() {
  ExplorarBebidas.displayName = 'Explorar Bebidas';
  return (
    <div>
      <Header title={ ExplorarBebidas.displayName } />
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
