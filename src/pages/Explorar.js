import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import ExplorarComidas from './ExplorarComidas';

function Explorar() {
  Explorar.displayName = 'Explorar';
  const history = useHistory();
  return (
    <div>
      <Header title={ Explorar.displayName } />
      <Button
        className="btn btn-dark btn-sm m-3 p-3"
        type="button"
        data-testid="explore-food"
        onClick={ () => history.push('explorar/comidas') }
      >
        Explorar Comidas
      </Button>
      <Button
        className="btn btn-dark btn-sm m-3 p-3"
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('explorar/bebidas') }
      >
        Explorar Bebidas
      </Button>
      <Footer />
    </div>
  );
}

export default Explorar;
