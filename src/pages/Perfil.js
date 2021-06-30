import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  Perfil.displayName = 'Perfil';
  return (
    <div>
      <Header title={ Perfil.displayName } />
      <Footer />
    </div>
  );
}

export default Perfil;
