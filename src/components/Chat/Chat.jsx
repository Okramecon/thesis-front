import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import ThesisAPI from "../../API/ThesisAPI";
import ChatInput from "./ChatInput";
import ChatWindow from "./ChatWindow";
import ThesisAPIService from "../../API/ThesisAPI";
import AlertSeverities from "../../helpers/AlertSeverities";
import {AppContext} from "../../App";
import cl from "./Chat.module.css";
import ChatHeader from "./ChatHeader";

const Chat = props => {
  const setAlertState = useContext(AppContext)

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
      alert('No connection to server yet.');
    }
  }

  return (
      <React.Fragment>
        <div className={cl.chat}>
          <ChatHeader title={props.getTitle(props.chatRoom)}/>
          <ChatWindow chat={chat}/>
          <ChatInput sendMessage={sendMessage} />
        </div>
      </React.Fragment>
  );
};

Chat.propTypes = {
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

export default Chat;