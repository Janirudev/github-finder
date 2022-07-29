import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Alert from './components/Layout/Alert';
import NotFound from './components/Pages/NotFound';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import User from './components/Users/User';

import GithubState from './context/github/GithubState.js';
import AlertState from './context/alert/AlertState.js';

import './App.css';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar title="Github Finder" />
            <div className="container">
              <Alert />
              <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/about" exact component={About} />
                <Route path="/user/:login" exact component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
