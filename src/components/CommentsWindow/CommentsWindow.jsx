import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ThesisAPIService from "../../API/ThesisAPI";
import AlertSeverities from "../../helpers/AlertSeverities";
import {AppContext} from "../../App";
import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, Stack, TextField } from '@mui/material';

const CommentsWindow = ({ taskId }) => {
  const [comments, setComments] = useState([])
  const setAlertState = useContext(AppContext);

  const fetchTaskComments = () =>  {
    ThesisAPIService.getTasksComments(taskId)
    .then(response => {
      setComments(response.data.reverse())
    })
  }

  useEffect(() => {
    fetchTaskComments();
  }, []);

  const [comment, setComment] = useState({ticketId:taskId, message:''});

  function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }

  const sendComment = () => {
    if (isEmptyOrSpaces(comment.message))
      return;
    ThesisAPIService.postComment(comment)
    .then(response => {
      if(response.ok) {
        setAlertState({alertOpen: true, message: response.message, severity: AlertSeverities.success, duration: 6000})
        fetchTaskComments();
      } else {
        setAlertState({alertOpen: true, message: response.message, severity: AlertSeverities.error})
      }
    })
  }

  return (
    <React.Fragment>
      <Stack direction='row' spacing={2}>
        <TextField size='small' required fullWidth
          id="1"
          value={comment.message}
          onChange={e => setComment({...comment, message: e.target.value})}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              sendComment();
              ev.preventDefault();
            }
          }}>
        </TextField>
        <Button size='small' onClick={sendComment} startIcon={<SendIcon/>} variant='outlined' sx={{pl:'6px'}}>
          Send
        </Button>
      </Stack>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {comments.map((comment) =>
          <ListItem key={comment.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={comment?.user?.userName} src="d" />
            </ListItemAvatar>
            <ListItemText
              primary={comment.user.userName + "(" + comment.user?.firstName + " " + comment.user?.lastName + ")"}
              secondary={
                <React.Fragment >
                  <Typography
                    sx={{ display: 'inline', wordWrap:'break-Word'}}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment.message}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        )}
      </List>
    </React.Fragment>
  );
};

CommentsWindow.propTypes = {
  taskId: PropTypes.number
};

export default CommentsWindow;