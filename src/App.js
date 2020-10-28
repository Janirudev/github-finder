import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users'
import axios from 'axios'
import Search from "./components/Users/Search"
import Alert from "./components/Layout/Alert"
import About from "./components/Pages/About"
import './App.css';

class App extends Component {
  state = {
    users: [],
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
    const { users, alert, loading } = this.state;
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
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
