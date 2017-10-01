import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Messages from './Messages';

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: this.props.messages || [],
      otherUser: '',
      otherUserImageUrl: '',
      conversationId:  null,
      convoIdToPass: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setConvoToPass() {
    if (this.props.messages[0] === undefined) {
      this.setState({ convoIdToPass: 0 });
    } else {
      this.setState({ convoIdToPass: this.props.messages[0].conversationId})
    }
  }
  
  componentWillMount() {
    this.setConvoToPass.call(this);
    if (this.props.messages[0]) {
      this.setState({
        messages: this.props.messages,
        conversationId: this.props.messages[0].conversationId,
      }, () => {
        if (!this.state.messages[0].text) {
          this.setState({messages: [{id:0}]});
        }
      })
    } else {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    this.socket = io('/');
    this.socket.on('message', message => {
      this.setState({messages: [...this.state.messages, message]});
    });
  }


  handleSubmit (event) {
    const text = event.target.value;
    if (event.key == 'Enter' && text) {
      const message = {
        text,
        conversationId: this.state.conversationId,
        userId: this.props.currentUser,
        id: this.state.messages[this.state.messages.length-1].id+1,
      }
      this.setState({messages: [...this.state.messages, message]})
      this.socket.emit('message', message)
      event.target.value = '';
    }
  }

  render() {
    return (
      <div>
        <input type="text" placeholder='Enter a message...' onKeyUp={this.handleSubmit.bind(this)}/>
        <Messages
          messages={this.state.messages}
          currentUser={this.props.currentUser}
          currentUserImage={this.props.currentUserImage}
          otherUserImageUrl={this.props.otherUserImageUrl}
          conversationId={this.state.convoIdToPass}
        />
      </div>
    )
  }
}

export default Chat;