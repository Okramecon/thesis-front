import React, {useEffect, useState} from 'react';
import List from "@mui/material/List";
import PropTypes from 'prop-types';
import ChatButton from "../ChatButton";
import cl from "./ChatRoomList.module.css";
import ThesisAPIService from "../../../API/ThesisAPI";

const ChatRoomList = props => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    console.log(props.connection)
    ThesisAPIService
        .getUserChats(props.userName)
        .then(response => {
          setChatRooms(response.data);
        })
  }, []);

  const handleChatRoomClick = (chatId) => {
    ThesisAPIService
        .getChatRoom(chatId)
        .then(response => {
          if(response.ok) {
            props.selectChatRoom(response.data)
          }
        });
  }

  return (
      <div className={cl.chatRoomList}>
        <List sx={{
          width: '100%',
          maxWidth: 400,
          borderRadius:"5px"}}>
          {chatRooms.map(chatRoom =>
              <ChatButton
                  key={chatRoom.id}
                  chatId={chatRoom.id}
                  title={props.getTitleFromChatRoom(chatRoom)}
                  onClickAction={handleChatRoomClick}/>
          )}
        </List>
      </div>
  );
};

ChatRoomList.propTypes = {
  userName: PropTypes.string,
  getTitleFromChatRoom: PropTypes.func,
  selectChatRoom: PropTypes.func
};

export default ChatRoomList;