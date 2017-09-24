import React, { Component } from 'react';
import axios from 'axios';
import ConversationStubs from './ConversationStubs.jsx';
import Auth from './../Auth/Auth.jsx';
import { Navbar, Button } from 'react-bootstrap';

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
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {
              !isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default App;