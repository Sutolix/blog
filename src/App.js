import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './global.css';

import Header from './components/Header';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Question from './components/Question';
import Notifications from './components/Notifications';
import Login from './components/Login';
import Register from './components/Register';
import Erro from './components/Erro';

class App extends Component{

  render(){
    return(
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/dashboard" component={ Dashboard } />
          <Route exact path="/question" component={ Question } />
          <Route exact path="/notifications" component={ Notifications } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/*" component={ Erro } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
