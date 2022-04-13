import React, {useContext, useEffect, useState} from 'react';
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
import PropTypes from 'prop-types';
import ThesisAPIService from "../../API/ThesisAPI";
import AlertSeverities from "../../helpers/AlertSeverities";
import {AppContext} from "../../App";
import ClickableCard from "../UI/ClickableCard/ClickableCard";
import {TextInput} from "../UI/TextInput/TextInput";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import cl from './CommentsWindow.module.css'

const CommentsWindow = props => {

    const [comments, setComments] = useState([])
    const [update, setUpdate] = useState(false)
    const setAlertState = useContext(AppContext);

    const fetchTasks = async () =>  {
        const response =  await ThesisAPIService.getTasksComments(props.taskId);
        setComments(response.data);
    }

    useEffect(() => {
        fetchTasks();
    }, [update]);

    const sendComment = async (comment) => {
        const response =  await ThesisAPIService.postComment(comment);
    }

    return (
        <React.Fragment>
            <Divider sx={{marginTop:"30px"}}/>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {comments.map((comment) =>
                    <ListItem key={comment.id} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={comment.user.userName} src="d" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={comment.user.userName +"("+comment.user.firstName+" "+comment.user.lastName+")"}
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
            <Divider sx={{marginBottom:'5px'}}/>
            <TextInput
                updateComments={setUpdate}
                updateTrigger={update}
                userId={'a0f4c274-7a06-4a42-85f2-c7582e864730'}
                ticketId={props.taskId}
                sendComment={sendComment}/>

            {/*<h1 className={cl.title}>*/}
            {/*    Discussing*/}
            {/*</h1>*/}
        </React.Fragment>
    );
};

CommentsWindow.propTypes = {
    taskId: PropTypes.number
};

export default CommentsWindow;