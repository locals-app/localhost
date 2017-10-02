// dependencies
import React, { Component } from 'react';
import { Route, NavLink , Router, Switch, HashRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
// components
import Profile from './profile/Profile';
import Locals from './locals/Locals';
import Chat from './chat/Chat';
import Splash from './splash/Splash';

// creates navigation bar by which users will navigate through app
class Navigator extends Component {

  constructor (props) {
    super(props);
    this.state = {
      locationQuery: '',
      profile: null,
      userData: {},
      myMessages: {},
      chatMessages: [],
      otherUserImageUrl: '',
      currentConvos: [],
      usernameArray: []
    }
  }

  componentDidMount() {
    this.updateMessages();
  }

  passChatMessages(val) {
    this.setState({chatMessages: [val]});
  }

  updateMessages() {
    if (this.state.chatMessages.length === 1 && this.state.chatMessages[0].text === undefined) {
      axios({
        url: '/api/modifyconversation',
        method: 'delete',
        data: {
          firstUser: this.state.chatMessages[0].userId,
          secondUser: this.state.userData.username
        }
      }).then(() => {}).catch((err) => {
        console.log(err)
      });
    }
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }
      this.setState({ profile }, () => {
        axios.get(`/api/profiles/${this.state.profile.given_name}_${this.state.profile.family_name}`)
          .then( (results) => {
            if (results.data) {
              this.setState({userData: results.data});
            } else {
              axios.post('/api/profiles/createnew', {
                username: `${this.state.profile.given_name}_${this.state.profile.family_name}`,
                location: '',
                biography: '',
                isLocal: false,
                rating: '[]',
                imageUrl: this.state.profile.picture_large,
              }).then(results => this.setState({userData: results.data}))
                .catch(err => console.error(err))
              }
            }).catch( (err) => {
              throw err;
            }).then(() => {
              axios.get(`/api/messages/${this.state.userData.username}`)
                .then((results) => {
                  this.setState({ 
                    myMessages: this.sortByRoom(results.data.messages), 
                    usernameArray: results.data.usernameArray
                  });
                  axios.post('/api/modifyconversation', {
                    firstUser: this.state.userData.username,
                    secondUser: this.state.userData.username
                  }).then((results) => {});
                }).catch(err => console.error(err));
            }).catch(err => console.error(err));
          });
    }.bind(this));
  }

  handleSelect(val, event) {
    val.history.push('/Locals');
    this.setState({ locationQuery: val.text });
  }


  sortByRoom(messagesArray) {
    let objectOfConvos = {};
    messagesArray.forEach((message) => {
      if (objectOfConvos[message.conversationId]) {
        objectOfConvos[message.conversationId].push(message);
      } else {
        objectOfConvos[message.conversationId] = [message];
      }
    });
    return objectOfConvos;
  }

  launchChat(val, event) {
    val.history.push('/Chat');
    this.setState({
      chatMessages: val.messages,
      otherUserImageUrl: val.otherUserImageUrl,
    });
  }

  render() {
    return (
      <div>
          <HashRouter>
          <div>
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav main-nav">		
                <li className="nav-item active left-logo">		
                  <NavLink to='/' onClick={this.updateMessages.bind(this)} className="navbar-brand" id="main-logo">localhost</NavLink>		
                </li>		
                <li className="nav-item right-logo">		
                  <ul className="right-list">
                    <li className="right-list-item">                        		
                      <NavLink to='/Profile' className="nav-link">		
                        <span onClick={this.props.logout}>Logout</span>	 	
                        <span><img className='profile-pic' src={this.state.userData.imageUrl} /></span>		
                      </NavLink>		
                    </li>		
                  </ul>		
                </li>		
              </ul>		
            </div>
            </nav>
            <Switch>
              <Route exact path='/' render={(props) => (
                <Splash
                  {...props}
                  lock={this.props.lock}
                  idToken={this.props.idToken}
                  handleSelect={this.handleSelect.bind(this)}
                  myMessages={this.state.myMessages}
                  currentUser={this.state.userData.username}
                  launchChat={this.launchChat.bind(this)}
                />
              )}/>
              <Route path='/access_token*' render={() => {
                return (<Redirect to='/'/>)
              }}/>
              <Route path='/Locals' render={(props) => (
                <Locals
                  {...props}
                  lock={this.props.lock}
                  idToken={this.props.idToken}
                  locationQuery={this.state.locationQuery}
                  launchChat={this.launchChat.bind(this)}
                  currentUser={this.state.userData.username}
                  usernameArray={this.state.usernameArray}
                />
              )}/>
              <Route path='/Profile' render={(props) => (
                <Profile
                  {...props}
                  user={this.state.userData}
                  lock={this.props.lock}
                  idToken={this.props.idToken}
                />
              )}/>
              <Route path='/Chat' render={(props) => (
                <Chat
                  {...props}
                  lock={this.props.lock}
                  idToken={this.props.idToken}
                  currentUser={this.state.userData.username}
                  currentUserImage={this.state.userData.imageUrl}
                  messages={this.state.chatMessages}
                  otherUserImageUrl={this.state.otherUserImageUrl}
                  passChatMessages={this.passChatMessages.bind(this)}
                />
              )}/>
            </Switch>
          </div>
          </HashRouter>
      </div>
    )
  }
}

export default Navigator;