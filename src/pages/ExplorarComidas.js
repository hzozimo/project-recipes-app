import React from 'react';
import Header from '../components/Header';

function ExplorarComidas() {
  ExplorarComidas.displayName = 'Explorar Comidas';
  return (
    <div>
      <Header title={ ExplorarComidas.displayName } />
    </div>
  );
}

export default ExplorarComidas;
