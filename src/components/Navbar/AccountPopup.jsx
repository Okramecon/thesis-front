import { AccountCircleOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, Popover, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import AlertSeverities from '../../helpers/AlertSeverities';

function AccountPopup({ setLoggedIn }) {
  const setAlertState = useContext(AppContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const username = localStorage.getItem('username')
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const logout = () => {
    localStorage.removeItem('bearer')
    localStorage.removeItem('username')
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('expires')
    localStorage.removeItem('roles')
    setAlertState({ alertOpen: true, message: 'Successfully logged out!', severity: AlertSeverities.info})
    navigate('/')
    setLoggedIn(false)
  }

  return (
    <React.Fragment>
      <IconButton color='inherit' onClick={handleClick}>
        <AccountCircleOutlined/>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Grid container direction='column' spacing={2} sx={{
          p: 2
        }}>
          <Grid item>
            <Typography> {username} </Typography>
          </Grid>
          <Grid item>
            <Button variant='contained' onClick={logout}> Logout</Button>
          </Grid>
        </Grid>
      </Popover>
    </React.Fragment>
  )
}

export default AccountPopup