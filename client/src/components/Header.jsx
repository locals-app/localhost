import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Brand } from 'react-bootstrap';
// import AuthActions from '../actions/AuthActions';
// import AuthStore from '../stores/AuthStore';
import { login, logout, isLoggedIn } from '../utils/AuthService.js';

class Header extends Component {

  render() {
    return (
      <Navbar>
        <Navbar>
          <Navbar.Brand>
            <a href="#">this is the header</a>
          </Navbar.Brand>
        </Navbar>
        <Nav>
          <NavItem onClick={this.login}>Login</NavItem>
          <NavItem onClick={this.logout}>Logout</NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;