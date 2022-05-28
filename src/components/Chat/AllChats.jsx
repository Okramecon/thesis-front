import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ListItemButton from '@mui/material/ListItemButton';
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow/ChatWindow";
import ThesisAPIService from "../../API/ThesisAPI";
import cl from "./Chat.module.css";
import {Divider} from "@mui/material";
import ChatUserSearch from "./ChatUserSearch/ChatUserSearch";
import ChatRoomList from "./ChatRoomList/ChatRoomList";

const AllChats = props => {
  const [selectedChatRoom, selectChatRoom] = useState(null);
  const [receiver, setReceiver] = useState("");
  const currentUsername = localStorage.getItem("username");


  useEffect(() => {
    if (selectedChatRoom !== null && selectedChatRoom !== undefined)
      setReceiver(selectedChatRoom.users.find(u => u.user.userName != currentUsername).user.userName);
  }, [selectedChatRoom, receiver]);

  const getTitleFromChatRoom = (chatRoom) => {
    if (chatRoom === null || chatRoom.users === null) return;
    const user = chatRoom.users.find(u => u.user.userName != currentUsername);
    return `${user.user.firstName} ${user.user.lastName}`;
  }

  return (
      <div className={cl.chatPage}>
        <div className={cl.sideBar}>
          <ChatUserSearch selectChatRoom={selectChatRoom} />
          <ChatRoomList
              userName={currentUsername}
              selectChatRoom={selectChatRoom}
              getTitleFromChatRoom={getTitleFromChatRoom}
          />
        </div>

        <ChatWindow getTitle={getTitleFromChatRoom} chatRoom={selectedChatRoom} receiver={receiver} connection={props.connection}/>
      </div>
  );
};

AllChats.propTypes = {
  connection: PropTypes.object
};

export default AllChats;