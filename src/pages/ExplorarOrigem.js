import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarOrigem() {
  ExplorarOrigem.displayName = 'Explorar Origem';
  return (
    <div>
      <Header title={ ExplorarOrigem.displayName } />
      <Footer />
    </div>
  );
}

export default ExplorarOrigem;
