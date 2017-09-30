import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Messages from './Messages';

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      otherUser: '',
      otherUserImageUrl: '',
      conversationId: null,
    }
    this.findOtherUser = this.findOtherUser.bind(this);
    this.fetchOtherUserImage = this.fetchOtherUserImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  findOtherUser(messages) {
		this.state.messages.forEach( message => {
			if (message.userId !== this.props.currentUser) {
				this.setState({otherUser: message.userId})
			}
		});
	}

	fetchOtherUserImage() {
		axios.get(`api/profiles/${this.state.otherUser}`).then((userData) => {
			this.setState({otherUserImageUrl: userData.data.imageUrl});
		}).catch(err => console.error(err));
  }
  
  componentWillMount() {
    this.setState({
      messages: this.props.messages,
      conversationId: this.props.messages[0].conversationId,
    });
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
        <Messages messages={this.state.messages} currentUser={this.props.currentUser} currentUserImage={this.props.currentUserImage}/>
      </div>
    )
  }
}

export default Chat;