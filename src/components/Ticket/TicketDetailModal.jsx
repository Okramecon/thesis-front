import { Backdrop, Box, Fade, Modal } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types';
import TicketDetails from './TicketDetails';

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
};

export default function TicketDetailModal(props) {

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
                        <TicketDetails task={props.task}/>
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
