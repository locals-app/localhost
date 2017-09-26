import React, { Component } from 'react';
import axios from 'axios';
import ConversationStubs from './ConversationStubs.jsx';
import Auth from './../Auth/Auth.jsx';
import { Navbar, Button } from 'react-bootstrap';

// from Hugo
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
// import Routes from './Routes';

class App extends Component {
  constructor (props) {
    super();
    this.state = {
      userLocationSet: false,
    }
    this.auth = new Auth();
  }

  goTo(route) {
    this.history.replace(`/${route}`);
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }



  render() {
    const { isAuthenticated } = this.auth;
    // return (<div>hi</div>)

    // if (this.state.userLocationSet) {
      
    //   return (
    //     <div>
    //       <input type="text" name="whereTo"/>
    //       <h1>Ongoing Conversations</h1>
    //       {/* <ConversationStubs /> */}
    //     </div>
    //   )
    // } 
    
    // else {
    //   return (
    //     <div> Set your location </div>
    //   )
    // }

  // }


    return (
        <BrowserRouter>
          <div>
          <NavBar />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;