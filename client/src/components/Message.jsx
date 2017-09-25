import React, { Component } from 'react';

const Message = ({message, currentUser}) => {
  if (message.userId === currentUser) {
    return (
      <li className='currentUser'>{message.text} <b> --- {message.userId}</b></li> // assigning classnames to both users for styling purposes
    );
  } else {
    return (
      <li className='otherUser'><b>{message.userId} --- </b>{message.text}</li> // assigning classnames to both users for styling purposes
    );
  }

};

export default Message;