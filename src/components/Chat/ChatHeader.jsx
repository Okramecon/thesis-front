import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import cl from "./Chat.module.css"

const ChatHeader = props => {
  return (
      <div className={cl.chatHeader}>
        <Typography sx={{fontSize:"20px", fontColor: "white", fontStyle:"bold"}}>{props.title}</Typography>
      </div>
  );
};

ChatHeader.propTypes = {
  title: PropTypes.string
};

export default ChatHeader;