import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Message from "../Message";
import cl from "./ChatMessageFeed.module.css";

const ChatMessageFeed = props => {

  useEffect(() => {
    let elem = document.getElementById('feed');
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

ChatMessageFeed.propTypes = {
  chat: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    fromId: PropTypes.string
  }))
};

export default ChatMessageFeed;