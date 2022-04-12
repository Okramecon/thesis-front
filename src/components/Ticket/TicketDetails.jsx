import React from 'react'
import PropTypes from 'prop-types'
import cl from './TicketDetails.module.css'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import ChevronRightRounded from '@material-ui/icons/ChevronRightRounded';
import ChevronLeftRounded from '@material-ui/icons/ChevronLeftRounded';
import SwitchToggle from "../UI/ToggleButton/SwitchToggle"
import CommentsWindow from "../CommentsWindow/CommentsWindow";

export default function TicketDetails(props) {

    const [toggled, setToggled] = React.useState(false);
    const [discussionOpen, setDiscussionOpen] = React.useState(false);

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
