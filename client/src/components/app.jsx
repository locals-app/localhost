import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { Link } from 'react-router';
import axios from 'axios';
import ConversationStubs from './ConversationStubs.jsx';
import NavBar from './NavBar';
import { requireAuth, login, logout, isLoggedIn } from '../utils/AuthService.jsx';
import Profile from './Profile';
import Locals from './Locals';
import Landing from './Landing';
import Callback from '../utils/Callback.jsx';

class App extends Component {
  
  render() {
    return (
      <div>
        <div>
          <div>
            <BrowserRouter>
              <div>
                <Route path='/Home' render={() => (
                  !isLoggedIn() ? 
                    login()   
                  (
                    <Redirect to="/Home"/>
                  )
                   : (
                    <Redirect to="/MyProfile"/>
                  )
                )}/>
                <Route path='/callback' component={Callback}/>
                <Route path='/Locals' component={Locals} onEnter={login}/>
                <Route path='/MyProfile' component={Profile} onEnter={requireAuth}/>
                <Route path='/Logout' onEnter={logout}/>
                <Route path='/Login' onEnter={login}/>
                <li><NavLink to='/Home'>Home</NavLink></li>
                <li><NavLink to='/Locals'>Locals</NavLink></li>
                <li><NavLink to='/MyProfile'>My Profile</NavLink></li>
                <li><NavLink to='/Logout'>Logout</NavLink></li>
                <li><NavLink to='/Login'>Login</NavLink></li>
              </div>
            </BrowserRouter>
          </div>
          <div>
            {/* <li><NavLink to='/Home'>Home</NavLink></li>
            <li><NavLink to='/Locals'>Locals</NavLink></li>
            <li><NavLink to='/MyProfile'>My Profile</NavLink></li>
            <li><NavLink to='/Logout'>Logout</NavLink></li>
            <li><NavLink to='/Login'>Login</NavLink></li> */}
          </div>
        </div>
      </div>
    )
  }
}

export default App;