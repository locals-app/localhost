import React, { Component } from 'react';

const Message = ({message, currentUser, currentUserImage}) => {
  if (message.text) {
    if (message.userId === currentUser) {
      return (
        <li className='currentUser'>{message.text} <b> --- {message.userId}</b><img src={currentUserImage} style={{width: 20}} alt=""/></li> // assigning classnames to both users for styling purposes
      );
    } else {
      return (
        <li className='otherUser'><b>{message.userId} --- </b>{message.text}</li> // assigning classnames to both users for styling purposes
      );
    }
  } else {
    return null;
  }
};

export default Message;