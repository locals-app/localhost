import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import { requireAuth, login, logout, isLoggedIn } from '../utils/AuthService.jsx';
import Profile from './profile/Profile.jsx';
import Locals from './locals/Locals';
import Landing from './splash/Landing';
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
                    <div>
                      <Callback />
                      <Redirect to="/Home"/>
                    </div>
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
                <li><div onClick={()=>{console.log(isLoggedIn())}}> is it logged in? </div></li>
              </div>
            </BrowserRouter>
          </div>
        </div>
      </div>
    )
  }
}

export default App;