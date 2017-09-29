import React, { Component } from 'react';

class ConvoStub extends Component {
	constructor(props) {
		super(props);
	}
	render = () => {
		let { messages } = this.props;
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