import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users';
import User from './components/Users/User';
import axios from 'axios';
import Search from './components/Users/Search';
import Alert from './components/Layout/Alert';
import About from './components/Pages/About';
import GithubState from './context/github/GithubState.js';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Get single user
  const getUser = async (username) => {
    setLoading(true);
    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    );
    setLoading(false);
    setUser(response.data);
  };

  // Get users repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    );
    setLoading(false);
    setRepos(response.data);
  };

  // Clear users from state
  const clearUsers = () => {
    setLoading(false);
    setUsers([]);
  };

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
                    <Search
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlertMsg}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              ></Route>
              <Route path="/about" exact component={About} />
              <Route
                path="/user/:login"
                exact
                render={(props) => (
                  <User
                    {...props}
                    getUser={getUser}
                    user={user}
                    loading={loading}
                    getUserRepos={getUserRepos}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
