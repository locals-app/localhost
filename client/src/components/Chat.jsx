import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Messages from './Messages';

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [{ // messages needs to be passed down w/ props
          "id": 7,
          "text": "From Tiffany to Max",
          "userId": "Tiffany",
          "conversationId": 3,
          "createdAt": "2017-09-25T22:09:40.368Z",
          "updatedAt": "2017-09-25T22:09:40.368Z"
        },
        {
          "id": 8,
          "text": "Hi Tiffany!",
          "userId": "Max",
          "conversationId": 3,
          "createdAt": "2017-09-25T22:09:40.493Z",
          "updatedAt": "2017-09-25T22:09:40.493Z"
        },
        {
          "id": 9,
          "text": "Hi Max!",
          "userId": "Tiffany",
          "conversationId": 3,
          "createdAt": "2017-09-25T22:09:40.955Z",
          "updatedAt": "2017-09-25T22:09:40.955Z"
        }],
      currentUser: 'Max', // this needs to be passed down in props
      conversationId: null,
    }
  }

  handleSubmit (event) {
    const text = event.target.value;
    if (event.key == 'Enter' && text) {
      const message = {
        text,
        userId: this.state.currentUser,
      }
      this.setState({messages: [message, ...this.state.messages]})
      this.socket.emit('message', text)
      event.target.value = '';
    }
  }

  render() {
    return (
      <div>
        <input type="text" placeholder='Enter a message...' onKeyUp={this.handleSubmit.bind(this)}/>
        <Messages messages={this.state.messages} currentUser={this.state.currentUser}/>
      </div>
    )
  }
}

export default Chat;