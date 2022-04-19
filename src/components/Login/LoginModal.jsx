import { Backdrop, Box, Button, Fade, Modal } from "@mui/material";
import React, { useState } from "react";
import LoginForm from "./LoginForm";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function LoginModal({ setLoggedIn }) {
  const [open, setOpen] = useState(false)

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)} color="inherit">
        Login
      </Button>

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
            <LoginForm closeModal={() => setOpen(false)} setLoggedIn={setLoggedIn}/>
          </Box>
        </Fade>
      </Modal>
    </React.Fragment>
  )
}

export default LoginModal