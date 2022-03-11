import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Grid, Paper, Stack, Box, Snackbar, Alert } from '@mui/material';
import ThesisAPIService from '../API/ThesisAPI';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import AlertSeverities from '../helpers/AlertSeverities';

function LoginPage() {
  const [loginCredentials, setLoginCredentials] = useState({login:'', password:''})
  const {login, password} = loginCredentials
  const navigate = useNavigate()
  const setAlertState = useContext(AppContext)
  const loginWithCredentials = () => {
    /*const bearerToken = ThesisAPIService.loginWithCredentials(loginCredentials)
    localStorage.setItem('bearer', bearerToken)*/
    setAlertState({ loginAlertOpen: true, message: 'Successfully logged in!', severity: AlertSeverities.success})
    navigate('/')
  }

  return (
    <React.Fragment>
      <Box style={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Paper 
          style={{
            padding: 25
          }}
          variant="elevation"
          elevation={5}
        >
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <TextField 
                id="1" 
                required
                label="Login"
                value={login}
                onChange={e => setLoginCredentials({...loginCredentials, login:e.target.value})}
              />
            </Grid>
            <Grid item>
              <TextField 
                id="2"
                required
                label="Password"
                value={password}
                type="password"
                autoComplete="current-password"
                onChange={e => setLoginCredentials({...loginCredentials, password:e.target.value})}
              />
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={() => loginWithCredentials()}>Login</Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </React.Fragment>
  )
}

export default LoginPage