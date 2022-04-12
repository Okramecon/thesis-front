import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import cl from './TicketDetails.module.css'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import ChevronRightRounded from '@material-ui/icons/ChevronRightRounded';
import ChevronLeftRounded from '@material-ui/icons/ChevronLeftRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SwitchToggle from "../UI/ToggleButton/SwitchToggle"
import CommentsWindow from "../CommentsWindow/CommentsWindow";
import ThesisAPIService from "../../API/ThesisAPI";
import AlertSeverities from "../../helpers/AlertSeverities";
import {AppContext} from "../../App";

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
        discussionWindow = <CommentsWindow/>
    }

    let details;
    if (toggled) {
        details = <div className={cl.details}>{props.task.details}</div>
    }

    return (
        <React.Fragment>
            <div className={cl.main}>
                {discussionOpen
                    ? <div>
                        <Button
                            color={'primary'}
                            fullWidth className={cl.discussButton}
                            onClick={() => setDiscussionOpen(!discussionOpen)}
                        >
                            Back to task overview<ChevronLeftRounded />
                        </Button>
                        <div>{discussionWindow}</div>
                    </div>
                    : <div style={{width:'100%'}}>
                        <h1 className={cl.title}>{props.task.title}</h1>
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
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
                            <Select xs={{display:'flex', flexDirection:'column'}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Status"
                                onChange={handleStatusChange}
                                className={cl.select}
                            >
                                <MenuItem value={0}>New</MenuItem>
                                <MenuItem value={1}>Active</MenuItem>
                                <MenuItem value={2}>Completed</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            color={'primary'}
                            fullWidth className={cl.discussButton}
                            onClick={() => setDiscussionOpen(!discussionOpen)}
                        >
                            Discussion
                            { discussionOpen ? <ChevronLeftRounded /> : <ChevronRightRounded />}
                        </Button>
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
                }
            </div>
        </React.Fragment>
    )
}

TicketDetails.propTypes = {
    task: PropTypes.object
}
