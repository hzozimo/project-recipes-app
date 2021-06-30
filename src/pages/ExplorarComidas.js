import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarComidas() {
  ExplorarComidas.displayName = 'Explorar Comidas';
  return (
    <div>
      <Header title={ ExplorarComidas.displayName } />
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
