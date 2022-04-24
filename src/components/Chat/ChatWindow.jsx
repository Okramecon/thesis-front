import React from 'react';
import PropTypes from 'prop-types';
import Message from "./Message";
import cl from "./Chat.module.css";

const ChatWindow = props => {

  const chat = props.chat === undefined ? [] : props.chat
      .map(m => <Message
          key={Date.now() * Math.random()}
          user={m.fromId}
          message={m.message}/>);

  return (
      <React.Fragment>
        <div className={cl.messageFeed}>
          {chat}
        </div>
      </React.Fragment>
  );
};

ChatWindow.propTypes = {
  chat: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    fromId: PropTypes.string
  }))
};

export default ChatWindow;