import {Backdrop, Box, Fab, Fade, Modal, Tooltip} from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import AddProjectForm from './AddProjectForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CreateProjectModal({fetchProjects}) {
  const [open, setOpen] = useState(false)

  return (
    <React.Fragment>
      <Tooltip title='Create project' sx={{fontSize: 20}}>
        <Fab color="primary" aria-label="add" onClick={() => setOpen(true)} sx={{ position: 'fixed', bottom: 30, right: 50, transform: 'translateZ(0px)' }}>
          <AddIcon />
        </Fab>
      </Tooltip>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AddProjectForm closeModal={() => setOpen(false)} fetchProjects={fetchProjects}/>
          </Box>
        </Fade>
      </Modal>
    </React.Fragment>
  )
}

export default CreateProjectModal