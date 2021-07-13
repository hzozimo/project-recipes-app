import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Comidas, Bebidas, Login, Perfil, DetalhesComida,
  DetalhesBebida, Explorar, ExplorarComidas, ExplorarBebidas, ExplorarOrigem,
  IngredientesComidas, IngredientesBebidas, inProgressComida,
  InProgressBebidas, ReceitasFeitas, ReceitasFavoritas, NotFound } from './pages/index';

function App() {
  return (
    <Switch>
      <Route path="/explorar/bebidas/ingredientes" component={ IngredientesBebidas } />
      <Route path="/explorar/comidas/ingredientes" component={ IngredientesComidas } />
      <Route path="/comidas/:id/in-progress" component={ inProgressComida } />
      <Route path="/bebidas/:id/in-progress" component={ InProgressBebidas } />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route exact path="/explorar/comidas/area" component={ ExplorarOrigem } />
      <Route exact path="/comidas/:id" component={ DetalhesComida } />
      <Route exact path="/bebidas/:id" component={ DetalhesBebida } />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route component={ NotFound } />

      <Route exact path="/" component={ Login } />

    </Switch>
  );
}

export default App;
