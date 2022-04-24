import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from '@mui/material/ListItemButton';
import { Divider } from '@mui/material';

const ChatButton = (props) => {
  return (
      <React.Fragment>
        <ListItemButton sx={{ height: "60px", width: "100%"}} onClick={() => props.onClickAction(props.chatId)}>
          <ListItemAvatar sx={{marginLeft:"10px"}}>
            <Avatar alt={props.title} src="d" />
          </ListItemAvatar>
          <ListItemText primary={props.title} />
        </ListItemButton>
      </React.Fragment>
  );
};

ChatButton.propTypes = {
  chatRoom: PropTypes.object,
  chatId: PropTypes.number,
  onClickAction: PropTypes.func
};

export default ChatButton;