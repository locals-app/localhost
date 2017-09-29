import React, { Component } from 'react';

class ConvoStub extends Component {
	constructor(props) {
		super(props);
		this.state ={
			otherUser: '',
		}

		this.findOtherUser = this.findOtherUser.bind(this);
	}

	componentWillMount() {
		this.setState({otherUser: this.findOtherUser(this.props.messages)});
	}

	findOtherUser(messages) {
		
	}

	render = () => {
		let { messages, currentUser } = this.props;
		console.log('====================================')
		console.log(currentUser);
		console.log('====================================')
		return (
			<div>
				{messages.map((message, i) => {
					return <div key={i}>{message.userId.replace('_', ' ')}: {message.text}</div>
				})}
			</div>
		)
	}
}

export default ConvoStub;