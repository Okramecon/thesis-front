import { Backdrop, Box, Fade, Modal } from '@mui/material'
import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import TicketDetails from './TicketDetails';
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from '@material-ui/core/styles';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    backgroundColor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
    padding:'0 0 20px 0'
};

const useStyles = makeStyles({
    toUpButton: {
        borderRadius:50,
        margin: 0,
        right: 20,
        top: 50,
        left: "auto",
        position: "fixed",
        color: "primary",
        boxShadow: '2px 1px 2px 1px  rgba(0,0,0,0.1)',
        zIndex: 20,
        backgroundColor: "white",
        height: '20px',
        width: '20px'
    },
    toDownButton: {
        borderRadius:50,
        margin: 0,
        right: 20,
        bottom: 50,
        left: "auto",
        position: "fixed",
        color: "primary",
        zIndex: 20,
        boxShadow: '2px 1px 2px 1px  rgba(0,0,0,0.1)',
        backgroundColor: "white",
        height: '20px',
        width: '20px'
    },
    addIcon: {
        fill: "black"
    }
});



export default function TicketDetailModal(props) {
    const classes = useStyles();

    const scrollToTop = () => {
        let scroll = document.getElementById('scrolledBlock');
        scroll.scrollTop = 0;
    }

    const scrollToBottom = () => {
        let scroll = document.getElementById('scrolledBlock');
        scroll.scrollTop = scroll.scrollHeight;
    }
    return (
        <React.Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.open}
                onClose={() => props.handleClose()}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 500}}
            >
                <Fade in={props.open}>
                    <Box sx={style}>
                        <Box id="scrolledBlock" sx={{overflowY:'auto', padding:'32px'}}>
                            <TicketDetails task={props.task}/>
                        </Box>
                            <Fab aria-label="Next Level" size='small' className={classes.toUpButton} onClick={() => {scrollToTop()}}>
                                <KeyboardDoubleArrowUpIcon className={classes.addIcon}/>
                            </Fab>
                            <Fab aria-label="Next Level" size='small' className={classes.toDownButton} onClick={() => {scrollToBottom()}}>
                                <KeyboardDoubleArrowDownIcon className={classes.addIcon}/>
                            </Fab>
                    </Box>
                </Fade>
            </Modal>
        </React.Fragment>
    )
}

TicketDetailModal.propTypes = {
    task: PropTypes.object,
    open: PropTypes.bool,
    handleClose: PropTypes.func
}
