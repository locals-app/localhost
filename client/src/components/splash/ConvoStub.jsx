import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { withRouter, Router } from 'react-router-dom';


class ConvoStub extends Component {
	constructor(props) {
		super(props);
		this.state ={
			otherUser: '',
			otherUserImageUrl: '',
			otherUserLocation: '',
			history: this.props.history,
			messages: this.props.messages
		}
		this.fetchOtherUserImage = this.fetchOtherUserImage.bind(this);
		this.deleteConversation = this.deleteConversation.bind(this);
	}

	componentDidMount() {
		axios.get(`/api/getconvobyid/${this.state.messages[0].conversationId}`).then((response) => {
			if (response.data.firstUser !== this.props.currentUser.replace(' ', '_')) {
				this.setState({ otherUser: response.data.firstUser }, () => {
					this.fetchOtherUserImage();
				});
			} else {
				this.setState({ otherUser: response.data.secondUser }, () => {
					this.fetchOtherUserImage();
				});
			}
		})
	}

	fetchOtherUserImage() {
		axios.get(`api/profiles/${this.state.otherUser}`).then((userData) => {
			console.log(userData)
			this.setState({
				otherUserImageUrl: userData.data.imageUrl,
				otherUserLocation: userData.data.location
			});
		}).catch(err => console.error(err));
	}

	deleteConversation() {
		axios({
			url: '/api/modifyconversation',
			method: 'delete',
			data: {
				firstUser: this.props.currentUser,
				secondUser: this.state.otherUser
			}
		}).then(() => {
			window.location.reload();
		}).catch((err) => {
			console.log(err);
		});
	}

	render = () => {
		let { messages, currentUser, launchChat } = this.props;
		return (
			<div id="convostub">
				<div onClick={launchChat.bind(null, this.state)}>
					<span>Conversation with {this.state.otherUser.replace('_', ' ')}</span>
					<div>A local from: {this.state.otherUserLocation}</div>
					<img src={this.state.otherUserImageUrl} style={{width: 20}} alt=""/>
					<div>
						{messages[messages.length - 1].text}
					</div>
				</div>
				<button onClick={this.deleteConversation}>Delete this conversation</button>
			</div>
		)
	}
}

export default withRouter(ConvoStub);