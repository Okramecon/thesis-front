import React, {useContext, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import cl from "./Chat.module.css"
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const ChatInput = props => {
  const [message, setMessage] = useState('')
  const valueRef = useRef('')

  const onSubmit = (e) => {
    e.preventDefault();
    const isMessageProvided = message && message !== '';

    if (isMessageProvided) {
      props.sendMessage(message, null);
    }
  }

  const send = () => {
    const isMessageProvided = message && message !== '';

    if (isMessageProvided) {
      props.sendMessage(message, null); // reply to todo
      setMessage("");
    }
  }

  return (
      <React.Fragment>
        <div className={cl.inputPanel}>
          <form className={cl.form} onSubmit={onSubmit}>
            <TextField
                id="outlined-basic"
                label=""
                multiline={true}
                fullWidth
                maxRows={3}
                style={{width: "100%", resize:"both"}}
                size='small'
                inputRef={valueRef}
                variant="outlined"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    send();
                    ev.preventDefault();
                  }
                }}
            />

            <button className={cl.sendButton} variant="outlined" onClick={send}><SendIcon /></button>
          </form>
        </div>
      </React.Fragment>
  );
};

ChatInput.propTypes = {

};

export default ChatInput;