import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users'
import User from './components/Users/User'
import axios from 'axios'
import Search from "./components/Users/Search"
import Alert from "./components/Layout/Alert"
import About from "./components/Pages/About"
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  // async componentDidMount() {
  //   this.setState({ loading: true })
  //   const response = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
  //   this.setState({ users: response.data, loading: false })
  // }

  // Search Github users
  searchUsers = async (text) => {
    this.setState({ loading: true })
    const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
    this.setState({ users: response.data.items, loading: false })
  }

  // Get single user
  getUser = async (username) => {
    this.setState({ loading: true })
    const response = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
    this.setState({ user: response.data, loading: false })
  }

  // Get users repos
  getUserRepos = async (username) => {
    this.setState({ loading: true })
    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
    this.setState({ repos: response.data, loading: false })
  }

  // Clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }

  // Show an alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
    setTimeout(() => { this.setState({ alert: null }) }, 5000)
  }

  render() {
    const { users, alert, loading, user, repos } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar title='Github Finder' />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route path="/" exact render={props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert} />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}></Route>
              <Route path="/about" exact component={About} />
              <Route path="/user/:login" exact render={props => (
                <User {...props} getUser={this.getUser} user={user} loading={loading} getUserRepos={this.getUserRepos} repos={repos} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
