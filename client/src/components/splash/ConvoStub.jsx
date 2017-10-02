import React, { Component } from 'react';
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

	render = () => {
		let { messages, currentUser, launchChat } = this.props;
		return (

			<div className="media convo-stub-entire-media" onClick={launchChat.bind(null, this.state)}>
        <img className="convo-profile-small-img d-flex align-self-center mr-3" src={this.state.otherUserImageUrl} alt="Profile pic"/>
        <div className="media-body">
          <h5 className="mt-0 convo-stub-user-name">{this.state.otherUser.replace('_', ' ')}</h5>
          <p className="convo-stub-user-location">{this.state.otherUserLocation}</p>
          <p className="mb-0 convo-stub-user-message">{messages[messages.length - 1].text}</p>
        </div>
		  </div>
		)
	}
}

export default withRouter(ConvoStub);