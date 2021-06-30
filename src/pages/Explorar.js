import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorar() {
  Explorar.displayName = 'Explorar';
  return (
    <div>
      <Header title={ Explorar.displayName } />
      <h1>Explorar</h1>
      <Footer />
    </div>
  );
}

export default Explorar;
