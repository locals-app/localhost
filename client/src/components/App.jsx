import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import { requireAuth, login, logout, isLoggedIn } from '../utils/AuthService.jsx';
import Profile from './profile/Profile.jsx';
import LoggedIn from './splash/LoggedIn';
import Locals from './locals/Locals';
import Landing from './splash/Landing';
import Callback from '../utils/Callback.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idToken: '',
    };
  }

  componentWillMount() {
    this.lock = new Auth0Lock('kaQTBjg6m1VWXujuWrjYNDahHpDyJBEk', 'localhost-app.auth0.com');
    this.setState({idToken: this.getIdToken()})
  }

  getIdToken() {
    // First, check if there is already a JWT in local storage
    var idToken = localStorage.getItem('id_token');
    var authHash = this.lock.parseHash(window.location.hash);
    // If there is no JWT in local storage and there is one in the URL hash,
    // save it in local storage
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('id_token', authHash.id_token);
      }
      if (authHash.error) {
        // Handle any error conditions
        console.log("Error signing in", authHash);
      }
    }
    return idToken;
  }
  
  // renders Landing component which is currently functioning as our sign-in page or is attempting to make a GET request by rendering the Locals component
  render() {
    console.log(this.state);
    console.log(this.state.idToken);
    if (this.state.idToken) {
      return (<Locals lock={this.lock} idToken={this.state.idToken} />);
    } else {
      return (<Landing lock={this.lock} />);
    }
  }

}

export default App;










  // return (
  //   <div>
  //     <div>
  //       <div>
  //         <BrowserRouter>
  //           <div>
  //             <Route path='/Home' render={() => (
  //               !isLoggedIn() ? 
  //                 login()   
  //               (
  //                 <div>
  //                   <Callback />
  //                   <Redirect to="/Home"/>
  //                 </div>
  //               )
  //                : (
  //                 <Redirect to="/MyProfile"/>
  //               )
  //             )}/>
  //             <Route path='/callback' component={Callback}/>
  //             <Route path='/Locals' component={Locals} onEnter={login}/>
  //             <Route path='/MyProfile' component={Profile} onEnter={requireAuth}/>
  //             <Route path='/Logout' onEnter={logout}/>
  //             <Route path='/Login' onEnter={login}/>
  //             <li><NavLink to='/Home'>Home</NavLink></li>
  //             <li><NavLink to='/Locals'>Locals</NavLink></li>
  //             <li><NavLink to='/MyProfile'>My Profile</NavLink></li>
  //             <li><NavLink to='/Logout'>Logout</NavLink></li>
  //             <li><div onClick={()=>{console.log(isLoggedIn())}}> is it logged in? </div></li>
  //           </div>
  //         </BrowserRouter>
  //       </div>
  //     </div>
  //   </div>
  // )