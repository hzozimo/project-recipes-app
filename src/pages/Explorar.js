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
      <div className="explorer-container-buttons">
        <Button
          className="explorer-button-initial mb-5"
          type="button"
          data-testid="explore-food"
          onClick={ () => history.push('explorar/comidas') }
        >
          Explorar Comidas
        </Button>
        <Button
          className=" explorer-button-initial"
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('explorar/bebidas') }
        >
          Explorar Bebidas
        </Button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Explorar;
