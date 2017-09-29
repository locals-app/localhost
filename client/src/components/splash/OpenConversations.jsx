import React, { Component } from 'react';

class OpenConversations extends Component {
  constructor(props) {
  	super(props);
  }

  render = () => {
  	console.log(this.props.myMessages)
		return (
		  <div>
		    Here's where a coversation stub would go.
		  </div>
		)
  }
};

export default OpenConversations;
