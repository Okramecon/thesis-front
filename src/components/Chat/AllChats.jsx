import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { styled, alpha } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ChatWindow from "./ChatWindow";
import ListItemButton from '@mui/material/ListItemButton';
import ChatButton from "./ChatButton";
import Chat from "./Chat";
import ThesisAPIService from "../../API/ThesisAPI";
import AlertSeverities from "../../helpers/AlertSeverities";
import {AppContext} from "../../App";
import cl from "./Chat.module.css";
import {Divider} from "@mui/material";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
      },
    },
  },
}));

const AllChats = props => {
  const [selectedChatRoom, selectChatRoom] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [q, setQ] = useState("");
  const [users, setUsers] = useState([]);
  const currentUsername = localStorage.getItem("username");

  useEffect(() => {
    ThesisAPIService
        .getUserChats(currentUsername)
        .then(response => {
          setChatRooms(response.data);
        })
  }, []);

  useEffect(() => {
    if (selectedChatRoom !== null && selectedChatRoom !== undefined)
      setReceiver(selectedChatRoom.users.find(u => u.user.userName != currentUsername).user.userName);
  }, [selectedChatRoom, receiver]);

  useEffect(() => {
    setUsers([]);
    if (q === "") return;
    ThesisAPIService.searchUsers(q)
        .then(response => {
          setUsers(response.data);
        })
  }, [q]);

  const handleChatRoomClick = (chatId) => {
    ThesisAPIService
      .getChatRoom(chatId)
      .then(response => {
        if(response.ok) {
          selectChatRoom(response.data)
        }
      });
  }

  const handleUserClick = (user) => {
    ThesisAPIService
        .getCommonChatRoom(user.id)
        .then(response => {
          if(response.ok) {
            selectChatRoom(response.data)
          }
          else {
            selectChatRoom({
              id: null,
              name: "",
              users: [
                {
                  userId: user.userId,
                  user: user
                }
              ],
              chatMessages: []
            })
          }
        });
  }

  const getTitleFromChatRoom = (chatRoom) => {
    if (chatRoom === null || chatRoom.users === null) return;
    const user = chatRoom.users.find(u => u.user.userName != currentUsername);
    return `${user.user.firstName} ${user.user.lastName}`;
  }

  return (
      <React.Fragment>
        <div className={cl.sideBar}>
          <div>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <List sx={{
              marginTop: "10px",
              padding: "5px 10px",
              width: "100%",
              height: "100px",
              overflow: "auto",
              bgcolor: '#f6f6f6',
              borderRadius:"5px" }}>
              {users.map((user) => (
                  <div key={user.id}>
                    <ListItemButton
                        sx={{ height: "40px", width: "100%"}}
                        onClick={() => handleUserClick(user)}>
                      <ListItemText style={{whiteSpace: "nowrap", width:"100px", fontSize: "10px", overflow: "hidden", textOverflow: "ellipsis"}} primary={`${user.firstName} ${user.lastName} (${user.userName})`} />
                    </ListItemButton>
                    <Divider/>
                  </div>
              ))}
            </List>
          </div>

          <div className={cl.chatRoomList}>
            <List sx={{
              width: '100%',
              maxWidth: 400,
              bgcolor: 'background.paper',
              borderRadius:"5px"}}>
              {chatRooms.map(chatRoom =>
                  <ChatButton
                      key={chatRoom.id}
                      chatId={chatRoom.id}
                      title={getTitleFromChatRoom(chatRoom)}
                      onClickAction={handleChatRoomClick}/>
              )}
            </List>
          </div>
        </div>

        <Chat getTitle={getTitleFromChatRoom} chatRoom={selectedChatRoom} receiver={receiver} connection={props.connection}/>
      </React.Fragment>
  );
};

AllChats.propTypes = {
  connection: PropTypes.object
};

export default AllChats;