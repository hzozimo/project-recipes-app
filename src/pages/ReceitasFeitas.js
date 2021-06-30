import React from 'react';
import Header from '../components/Header';

function ReceitasFeitas() {
  ReceitasFeitas.displayName = 'Receitas Feitas';
  return (
    <div>
      <Header title={ ReceitasFeitas.displayName } />
    </div>
  );
}

export default ReceitasFeitas;
