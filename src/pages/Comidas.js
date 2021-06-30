import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContextRecipes from '../context/ContextRecipes';

function Comidas() {
  const { data } = useContext(ContextRecipes);
  Comidas.displayName = 'Comidas';
  return (
    <div>
      <Header title={ Comidas.displayName } />
      <h1>Comidas</h1>
      {console.log(data)}
      <Footer />
    </div>
  );
}

export default Comidas;
