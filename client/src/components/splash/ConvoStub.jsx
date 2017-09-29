import React, { Component } from 'react';
import axios from 'axios';


class ConvoStub extends Component {
	constructor(props) {
		super(props);
		this.state ={
			otherUser: '',
			otherUserImageUrl: '',
		}

		this.findOtherUser = this.findOtherUser.bind(this);
		this.fetchOtherUserImage = this.fetchOtherUserImage.bind(this);
	}

	componentWillMount() {
		this.findOtherUser();
	}

	componentDidMount() {
		this.fetchOtherUserImage();
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
		let { messages, currentUser } = this.props;
		return (
			<div>
				<span>Conversation with {this.state.otherUser.replace('_', ' ')}</span>
				<img src={this.state.otherUserImageUrl} style={{width: 20}} alt=""/>
				<div>
					{messages[messages.length - 1].text}
				</div>
			</div>
		)
	}
}

export default ConvoStub;