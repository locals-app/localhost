import React, { Component } from 'react';
import axios from 'axios';
import ConversationStubs from './ConversationStubs.jsx';
import NavBar from './NavBar';
import AuthService from '../utils/AuthService.jsx';

class App extends Component {
  
  render() {
    console.log('====================================')
    console.log(AuthService);
    console.log('====================================')
    return (
      <div>
      {
        (AuthService.isLoggedIn() ? <NavBar/> : 'Not Logged In')
      }
      </div>
    );
  }
}

export default App;