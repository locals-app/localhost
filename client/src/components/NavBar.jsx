import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { login, logout, isLoggedIn } from '../utils/AuthService.jsx';
import Profile from './Profile';
import Locals from './Locals';
import Landing from './Landing';


class NavBar extends Component {
    constructor (props) {
      super();
    }

    render() {
      return (
        <div>
          <BrowserRouter>
            <div>
              <div>
                <li><NavLink to='/home'>Home</NavLink></li>
                <li><NavLink to='/locals'>Locals</NavLink></li>
                <li><NavLink to='/myProfile'>My Profile</NavLink></li>
                <li><NavLink to='/logout'>Logout</NavLink></li>
              </div>
              <Route path='/home' component={Landing}/>
              <Route path='/locals' component={Locals}/>
              <Route path='/myProfile' component={Profile}/>
              <Route path='/logout' component={Profile}/>
            </div>
          </BrowserRouter>
        </div>
      )
    }
}

export default NavBar;