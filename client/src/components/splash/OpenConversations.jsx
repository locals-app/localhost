import React, { Component } from 'react';
import ConvoStub from './ConvoStub'
import _ from 'underscore';

class OpenConversations extends Component {
  constructor(props) {
  	super(props);
  }

  render = () => {
  	let { myMessages, currentUser, launchChat } = this.props;
  	return (
  		<div>
  		{_.map(myMessages, (convo, convoId) =>{
  			return <ConvoStub key={convoId} messages={convo} currentUser={currentUser} launchChat={launchChat}/>
  		})}
  		</div>
  	)
  }
};

export default OpenConversations;
