import Auth from './../Auth/Auth.jsx';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';

class NavBar extends Component {
    constructor (props) {
      super();
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
      return (
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
      )
    }
}

export default NavBar;
