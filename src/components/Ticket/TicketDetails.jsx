import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import cl from './TicketDetails.module.css'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import ChevronRightRounded from '@material-ui/icons/ChevronRightRounded';
import ChevronLeftRounded from '@material-ui/icons/ChevronLeftRounded';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SwitchToggle from "../UI/ToggleButton/SwitchToggle"
import CommentsWindow from "../CommentsWindow/CommentsWindow";
import ThesisAPIService from "../../API/ThesisAPI";
import AlertSeverities from "../../helpers/AlertSeverities";
import {AppContext} from "../../App";
import NativeSelect from '@mui/material/NativeSelect';
import TestPage from "../../pages/TestPage";
import AddIcon from "@mui/icons-material/Add";

export default function TicketDetails(props) {

    const [toggled, setToggled] = React.useState(false);
    const [discussionOpen, setDiscussionOpen] = React.useState(false);
    const [status, setStatus] = React.useState(props.task.status);
    const setAlertState = useContext(AppContext);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        props.task.status = event.target.value;
        UpdateTask(props.task);
    };

    const UpdateTask = async (task) => {
        const response = await ThesisAPIService.UpdateTask(task);

         if(response.ok) {
             setAlertState({ alertOpen: true, message: 'Successfully saved changes!', severity: AlertSeverities.success})
             return 0;
         }
         setAlertState({ alertOpen: true, message: "Error. Changes has not saved!", severity: AlertSeverities.error})
         return -1;
    }

    let discussionWindow;
    if (discussionOpen) {
        discussionWindow = <CommentsWindow taskId={props.task.id}/>
    }

    let details;
    if (toggled) {
        details = <div className={cl.details}>{props.task.details}</div>
    }

    return (
        <React.Fragment>
            <div className={cl.main}>
                <h1 className={cl.title}>[Id: {props.task.id}] {props.task.title}</h1>
                <div className={cl.detailsSection}>
                    <div className={cl.detailsHead}>
                        <div>Details</div>
                        <SwitchToggle
                            button
                            toggled={toggled}
                            onClick={() => setToggled(!toggled)}
                        />
                    </div>
                    {details}
                </div>
                <div className={cl.editButton}>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="edit"
                        // onClick={() => {}} /> TODO edit modal
                    >
                        <EditIcon />
                    </IconButton>
                </div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
                    <Select
                        sx={{paddingLeft:"10px", paddingTop:"5px"}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={handleStatusChange}
                    >
                        <MenuItem sx={{width:'100%'}} value={0}>New</MenuItem>
                        <MenuItem sx={{width:'100%'}} value={1}>Active</MenuItem>
                        <MenuItem sx={{width:'100%'}} value={2}>Completed</MenuItem>
                    </Select>
                </FormControl>
                <div>
                    <CommentsWindow taskId={props.task.id}/>
                </div>
            </div>
        </React.Fragment>
    )
}

TicketDetails.propTypes = {
    task: PropTypes.object
}
