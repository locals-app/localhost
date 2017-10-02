import React, { Component } from 'react';
import Message from './Message';

const Messages = ({messages, currentUser, currentUserImage, otherUserImageUrl, conversationId}) => {
  return (
    <div>
      {messages.map((message) => {
        return (
          <Message
            message={message}
            key={message.id}
            currentUser={currentUser}
            currentUserImage={currentUserImage}
            otherUserImageUrl={otherUserImageUrl}
            conversationId={conversationId}
          />
        ) 
      })}
    </div>
  )
};

export default Messages;