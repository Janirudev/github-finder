import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users';
import User from './components/Users/User';
import Search from './components/Users/Search';
import Alert from './components/Layout/Alert';
import About from './components/Pages/About';
import GithubState from './context/github/GithubState.js';
import './App.css';

const App = () => {
  const [alert, setAlert] = useState(null);

  // Show an alert
  const showAlertMsg = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Github Finder" />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => (
                  <Fragment>
                    <Search setAlert={showAlertMsg} />
                    <Users />
                  </Fragment>
                )}
              ></Route>
              <Route path="/about" exact component={About} />
              <Route path="/user/:login" exact component={User} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
