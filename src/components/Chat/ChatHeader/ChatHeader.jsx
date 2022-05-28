import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import cl from "./ChatHeader.module.css"
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";

const headerTitleStyle = {
  fontSize:"20px",
  fontColor: "white",
  fontStyle:"bold"
}

const ChatHeader = props => {
  return (
      <div className={cl.chatHeader}>
        <ListItemAvatar sx={{marginLeft:"10px"}}>
          <Avatar alt={props.title} src="d" />
        </ListItemAvatar>
        <Typography sx={headerTitleStyle}>{props.title}</Typography>
      </div>
  );
};

ChatHeader.propTypes = {
  title: PropTypes.string
};

export default ChatHeader;