import React, { Component } from 'react';
import Message from './Message';

const Messages = ({messages, currentUser, currentUserImage}) => {
  return (
    <div>
      {messages.map((message) => {
        return <Message message={message} key={message.id} currentUser={currentUser} currentUserImage={currentUserImage}/>
      })}
    </div>
  )
};

export default Messages;