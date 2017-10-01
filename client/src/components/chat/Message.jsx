import React, { Component } from 'react';

const Message = ({message, currentUser, currentUserImage, otherUserImageUrl, conversationId}) => {
  if (message.text && (message.conversationId === conversationId)) {
    if (message.userId === currentUser) {
      return (
        <li className='currentUser'>{message.text} <b> --- {message.userId}</b><img src={currentUserImage} style={{width: 20}} alt=""/></li> 
      );
    } else {
      return (
        <li className='otherUser'><img src={otherUserImageUrl} style={{width: 20}} alt=""/><b>{message.userId} --- </b>{message.text}</li> 
      );
    }
  } else {
    return null;
  }
};

export default Message;