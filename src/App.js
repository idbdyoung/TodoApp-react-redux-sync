import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';

import Header from './components/Header';
import Footer from './components/Footer';
import AddTodo from './components/AddTodo';
import TodoListContainer from './containers/TodoListContainer';

const Container = styled.div`
  flex: 1;
`;

function App() {
  return (
    <Container>
      <Header/>
      <Switch>
        <Route
          exact
          path='/'
          component={TodoListContainer}
        />
        <Route
          path='/todo/add'
          component={AddTodo}
        />
      </Switch>
      <Footer/>
    </Container>
  );
}

export default hot(module)(App);
