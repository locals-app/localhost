import React, { Component } from 'react';

const Message = ({message, currentUser, currentUserImage, otherUserImageUrl, conversationId}) => {
  if (message.text && (message.conversationId === conversationId)) {
    if (message.userId === currentUser) {
      return (
        <li className="sender"><div className="sender-bubble">{message.text}</div><img src={currentUserImage} className="sender-photo" alt=""/></li> 
      );
    } else {
      return (
        
        <li className="recipient"><img className="recipient-photo" src={otherUserImageUrl} alt=""/><div className="recipient-bubble">{message.text}</div></li> 
      );
    }
  } else {
    return null;
  }
};

export default Message;