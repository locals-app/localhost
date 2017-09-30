import React, { Component } from 'react';
import Message from './Message';

const Messages = ({messages, currentUser, currentUserImage, otherUserImageUrl}) => {
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
          />
        )
      })}
    </div>
  )
};

export default Messages;