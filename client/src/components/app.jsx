import React, { Component } from 'react';
import axios from 'axios';
import ConversationStubs from './ConversationStubs.jsx';
import Auth from './../Auth/Auth.jsx';
import { Navbar, Button } from 'react-bootstrap';
import { Auth0Lock } from 'auth0-lock';

// from Hugo
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Routes from './Routes';

class App extends Component {
  constructor (props) {
    super();
    this.state = {
      userLocationSet: false,
    }
  }

  componentWillMount () {
    this.lock = new Auth0Lock('kaQTBjg6m1VWXujuWrjYNDahHpDyJBEk', 'localhost-app.auth0.com');
  }

  render() {
    return (
      <div>
        hello worls
      </div>
    );
  }
}

export default App;