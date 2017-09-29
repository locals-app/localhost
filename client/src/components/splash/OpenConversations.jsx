import React, { Component } from 'react';
import ConvoStub from './ConvoStub'
import _ from 'underscore';

class OpenConversations extends Component {
  constructor(props) {
  	super(props);
  }

  render = () => {
  	console.log(this.props.myMessages)
  	return (
  		<div>
  		{_.map(this.props.myMessages, (convo, convoId) =>{
  			return <ConvoStub key={convoId} />
  		})}
  		</div>
  	)
  }
};

export default OpenConversations;
