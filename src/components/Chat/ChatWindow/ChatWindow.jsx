import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import ChatInput from "../ChatInput/ChatInput";
import cl from "./ChatWindow.module.css";
import ChatHeader from "../ChatHeader/ChatHeader";
import chatIcon from "../../../images/chat-icon.svg"
import ChatMessageFeed from "../ChatMessageFeed/ChatMessageFeed";

const ChatWindow = props => {

  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);
  const from = localStorage.getItem("username");

  latestChat.current = chat;

  useEffect(() => {
    if (props.chatRoom === null) return;
    setChat(props.chatRoom.chatMessages)
  }, [props.chatRoom]);

  useEffect(() => {
    if (props.connection) {
      props.connection.start()
          .then(result => {
            console.log('Connected!');
            props.connection.on('newMessage', message => {
              const updatedChat = [...latestChat.current];
              updatedChat.push(message);
              setChat(updatedChat);
            });
          })
          .catch(e => console.log('Connection failed: ', e));
    }
  }, [props.connection]);

  if (!props.chatRoom) {
    return (
      <div className={cl.selectChatBanner}>
        <img className={cl.icon} src={chatIcon}/>
        <h1>Select chat</h1>
      </div>
    );
  }

  const sendMessage = async (message, replyTo) => {
    const chatMessage = {
      fromId: from,
      toId: props.receiver,
      message: message,
      replyTo: replyTo,
    };

    if (props.connection._connectionStarted) {
      try {
        await props.connection.send('SendTo', chatMessage);
      }
      catch(e) {
        console.log(e);
      }
    }
    else {
      console.log('No connection to server yet.');
    }
  }

  return (
      <React.Fragment>
        <div className={cl.chat}>
          <ChatHeader title={props.getTitle(props.chatRoom)}/>
          <ChatMessageFeed chat={chat}/>
          <ChatInput sendMessage={sendMessage} />
        </div>
      </React.Fragment>
  );
};

ChatWindow.propTypes = {
  chatRoom: PropTypes.shape({
    id: PropTypes.number,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.object
      })),
    chatMessages: PropTypes.arrayOf(
        PropTypes.shape({
          message: PropTypes.string
        })),
  }),
  getTitle: PropTypes.func,
  receiver:  PropTypes.string,
  connection: PropTypes.object
};

export default ChatWindow;