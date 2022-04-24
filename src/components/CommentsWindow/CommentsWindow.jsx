import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ThesisAPIService from "../../API/ThesisAPI";
import AlertSeverities from "../../helpers/AlertSeverities";
import {AppContext} from "../../App";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, CardMedia, IconButton, Input, Stack, TextField } from '@mui/material';
import { AttachFile } from '@mui/icons-material';

const imageExts = ['.png', '.jpg', '.jpeg']

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

  const [comment, setComment] = useState({ticketId:taskId, message:'',});
  const [sendDisabled, setSendDisabled] = useState(false)

  const attachedCount = (comment.attachments && comment.attachments.length != 0) ? (<Typography> Attached {comment.attachments.length} files </Typography>) : ''

  function isEmptyOrSpaces(str) {
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

  const handleAttachFiles = (e) => {
    const files = Array.from(e.target.files)
    const mediaIds = []
    Promise.all(files.map(file => 
      ThesisAPIService.postFile(file)
      .then(response => {
        mediaIds.push(response.data)
      })
    )).then(() => {
      setComment({...comment, attachments: mediaIds})
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
        <Button size='small' onClick={sendComment} disabled={sendDisabled} variant='outlined' sx={{pl:'6px'}}>
          Send
        </Button>
        <label htmlFor="icon-button-file">
          <Input onChange={handleAttachFiles} inputProps={{ multiple: true }} accept="image/*,.pdf,.doc,.docx,.docm" id="icon-button-file" type='file' sx={{visibility: 'hidden', position: 'absolute', width: 0, height: 0}}/>
          <IconButton color="primary" aria-label="upload picture" component="span">
            <AttachFile/>
          </IconButton>
        </label>
      </Stack>
      {attachedCount}
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {comments.map((comment) =>
          <ListItem key={comment.id} alignItems="flex-start" sx={{border:1, borderColor: 'grey.200', mb: '6px', borderRadius: '4px'}}>
            <Stack direction='column'>
              <Stack direction='row'>
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
              </Stack>
              <Stack direction='row'>
                {
                  comment.attachments.map(file => {
                    if(imageExts.includes(file.extension)) {
                      return (<CardMedia onClick={() => {
                        window.open(`${ThesisAPIService.mediaUrl}/${file.id}${file.extension}`, '_blank').focus();
                      }} component='img' height="50" image={`${ThesisAPIService.mediaUrl}/${file.id}${file.extension}`} sx={{pr: '4px', cursor: 'pointer'}} key={file.id}/>)
                    } else {
                      return (<Button onClick={() => {
                        window.open(`${ThesisAPIService.mediaUrl}/${file.id}${file.extension}`, '_blank').focus();
                      }} size='small' key={file.id}>{file.extension}</Button>)
                    }
                  })
                }
              </Stack>
            </Stack>
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