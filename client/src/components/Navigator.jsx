// dependencies
import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
// components
import Profile from './profile/Profile';
import Locals from './locals/Locals';
import Chat from './chat/Chat';
import Splash from './splash/Splash';

// creates navigation bar by which users will navigate through app
class Navigator extends Component {
    constructor (props) {
      super();
    }

    render() {
      return (
        <div>
          <div>
            <div>
              <BrowserRouter lock={this.props.lock}>
                <div>
                  <Route exact path='/' render={(props) => (
                    <Splash {...props} lock={this.props.lock} idToken={this.props.idToken}/>
                  )}/>
                  <Route path='/Locals' render={(props) => (
                    <Locals {...props} lock={this.props.lock} idToken={this.props.idToken}/>
                  )}/>
                  <Route path='/Profile' render={(props) => (
                    <Profile {...props} lock={this.props.lock} idToken={this.props.idToken}/>
                  )}/>
                  <Route path='/Chat' render={(props) => (
                    <Chat {...props} lock={this.props.lock} idToken={this.props.idToken}/>
                  )}/>
                  <li><NavLink to='/Profile' >Profile</NavLink></li>
                  <li><NavLink to='/Chat'>Chat</NavLink></li>
                  <div className='logoutButton' onClick={this.props.logout}>Logout</div>
                </div>
              </BrowserRouter>
            </div>
          </div>
        </div>
      )
    }
}

export default Navigator;

