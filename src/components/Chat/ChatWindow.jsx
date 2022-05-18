import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Message from "./Message";
import cl from "./Chat.module.css";

const ChatWindow = props => {

  useEffect(() => {
    var elem = document.getElementById('feed');
    elem.scrollTop = elem.scrollHeight;
  },[props.chat])

  const chat = props.chat === undefined ? [] : props.chat
      .map(m => <Message
          key={Date.now() * Math.random()}
          user={m.fromId}
          message={m.message}/>);

  return (
      <React.Fragment>
        <div id="feed" className={cl.messageFeed}>
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