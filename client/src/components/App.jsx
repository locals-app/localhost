// dependencies
import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom';
// components
import Navigator from './Navigator';
import Profile from './profile/Profile.jsx';
import LoggedIn from './splash/LoggedIn';
import Locals from './locals/Locals';
import SignIn from './splash/SignIn';

// The main container through which every component should render.
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idToken: '',
    };
  }

  // creates a lock and sets the idToken upon login
  componentWillMount() {
    this.lock = new Auth0Lock('kaQTBjg6m1VWXujuWrjYNDahHpDyJBEk', 'localhost-app.auth0.com');
    this.setState({idToken: this.getIdToken()})
  }

  logout() {
    localStorage.removeItem('id_token');
    this.setState({idToken: ''});
  }

  // function for getting idToken from Auth0
  getIdToken() {
    // First, check if there is already a JWT in local storage
    var idToken = localStorage.getItem('id_token');
    var authHash = this.lock.parseHash(window.location.hash);
    // If there is no JWT in local storage and there is one in the URL hash,
    // save it in local storage
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('id_token', authHash.id_token);
      }
      if (authHash.error) {
        // Handle any error conditions
        console.log("Error signing in", authHash);
      }
    }
    return idToken;
  }
  
  // renders SignIn component which is currently functioning as our sign-in page OR something else (ideally nav bar, routes, and the rest of the app)
  render() {
    if (this.state.idToken) {
      return (
        <div>
          <Navigator lock={this.lock} idToken={this.state.idToken} logout={this.logout.bind(this)}/>
        </div>
      );
    } else {
      return (<SignIn lock={this.lock} />);
    }
  }

}

export default App;