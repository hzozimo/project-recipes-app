import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

function Perfil() {
  const user = (JSON.parse(localStorage.getItem('user')) || '{}');
  const history = useHistory();

  Perfil.displayName = 'Perfil';
  return (
    <div>
      <Header title={ Perfil.displayName } />
      <p data-testid="profile-email">
        Email:
        { user.email }
      </p>
      <Button
        label="Receitas Feitas"
        datatestid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      />
      <Button
        label="Receitas Favoritas"
        datatestid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
      />
      <Button
        label="Sair"
        datatestid="profile-logout-btn"
        onClick={ () => localStorage.clear() || history.push('/') }
      />
      <Footer />
    </div>
  );
}

export default Perfil;
