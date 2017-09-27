import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { login, logout, isLoggedIn } from '../utils/AuthService.jsx';
import Profile from './profile/Profile';
import Locals from './locals/Locals';
import Landing from './splash/Landing';


class NavBar extends Component {
    constructor (props) {
      super();
    }

    render() {
      return (
        <div>
          <li><NavLink to='/Home'>Home</NavLink></li>
          <li><NavLink to='/Locals'>Locals</NavLink></li>
          <li><NavLink to='/MyProfile'>My Profile</NavLink></li>
          <li><NavLink to='/Logout'>Logout</NavLink></li>
        </div>
      )
    }
}

export default NavBar;