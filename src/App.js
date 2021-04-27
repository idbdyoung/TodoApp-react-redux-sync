import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';

import Header from './components/Header';
import Footer from './components/Footer';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

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
          component={TodoList}
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
