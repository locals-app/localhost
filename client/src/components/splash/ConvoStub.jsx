import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Router } from 'react-router-dom';


class ConvoStub extends Component {
	constructor(props) {
		super(props);
		this.state ={
			otherUser: '',
			otherUserImageUrl: '',
			history: this.props.history,
			messages: this.props.messages
		}

		this.findOtherUser = this.findOtherUser.bind(this);
		this.fetchOtherUserImage = this.fetchOtherUserImage.bind(this);
	}

	componentWillMount() {
		this.findOtherUser();
	}

	componentDidMount() {
		if (this.state.otherUser.length === 0) {
			axios.get(`/api/getconvobyid/${this.state.messages[0].conversationId}`).then((response) => {
				console.log(response.data);
				if (response.data.firstUser !== this.props.currentUser) {
					this.setState({ otherUser: response.data.firstUser }, () => {
						this.fetchOtherUserImage();
					});
				} else {
					this.setState({ otherUser: response.data.secondUser }, () => {
						this.fetchOtherUserImage();
					});
				}
			})
		} else {
			this.fetchOtherUserImage();
		}
	}

	findOtherUser(messages) {
		this.props.messages.forEach( message => {
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

	render = () => {
		let { messages, currentUser, launchChat } = this.props;
		return (
			<div onClick={launchChat.bind(null, this.state)}>
				<span>Conversation with {this.state.otherUser.replace('_', ' ')}</span>
				<img src={this.state.otherUserImageUrl} style={{width: 20}} alt=""/>
				<div>
					{messages[messages.length - 1].text}
				</div>
			</div>
		)
	}
}

export default withRouter(ConvoStub);