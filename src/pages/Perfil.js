import React from 'react';
import Header from '../components/Header';

function Perfil() {
  Perfil.displayName = 'Perfil';
  return (
    <div>
      <Header title={ Perfil.displayName } />
    </div>
  );
}

export default Perfil;
