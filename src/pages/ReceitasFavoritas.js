import React from 'react';
import Header from '../components/Header';

function ReceitasFavoritas() {
  ReceitasFavoritas.displayName = 'Receitas Favoritas';
  return (
    <div>
      <Header title={ ReceitasFavoritas.displayName } />
    </div>
  );
}

export default ReceitasFavoritas;
