import React, { Component } from 'react';

const Message = ({message, currentUser, currentUserImage, otherUserImageUrl, conversationId}) => {
  if (message.text && (message.conversationId === conversationId)) {
    if (message.userId === currentUser) {
      return (
        <li>{message.text} <b> --- {message.userId.replace('_', ' ')}</b><img src={currentUserImage} style={{width: 20}} alt=""/></li> 
      );
    } else {
      return (
        <li><img src={otherUserImageUrl} style={{width: 20}} alt=""/><b>{message.userId.replace('_', ' ')} --- </b>{message.text}</li> 
      );
    }
  } else {
    return null;
  }
};

export default Message;