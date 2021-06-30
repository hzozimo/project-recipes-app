import React from 'react';
import Header from '../components/Header';

function Comidas() {
  Comidas.displayName = 'Comidas';
  return (
    <div>
      <Header title={ Comidas.displayName } />
    </div>
  );
}

export default Comidas;
