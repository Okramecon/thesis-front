import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Grid, Paper, Box } from '@mui/material';
import ThesisAPIService from '../API/ThesisAPI';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import AlertSeverities from '../helpers/AlertSeverities';

function LoginPage() {
  const [loginCredentials, setLoginCredentials] = useState({login:'', password:''})
  const {login, password} = loginCredentials
  const navigate = useNavigate()
  const setAlertState = useContext(AppContext)

  const validateLoginCredentials = () => {
    return login && password
  }

  const loginWithCredentials = async () => {

    if(validateLoginCredentials()) {
      const loginData = await ThesisAPIService.loginWithCredentials(loginCredentials)  
      if(loginData.ok) {
        localStorage.setItem('bearer', 'Bearer ' + loginData.bearer)
        localStorage.setItem('username', loginData.userName)
        localStorage.setItem('loggedIn', true)
        setAlertState({ alertOpen: true, message: 'Successfully logged in!', severity: AlertSeverities.success})
        navigate('/')
        return
      } else {
        setAlertState({ alertOpen: true, message: loginData.message, severity: AlertSeverities.error})   
        return
      }
    }

    setAlertState({ alertOpen: true, message: 'Wrong login credentials', severity: AlertSeverities.error})
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
                <Button variant="contained" onClick={async () => await loginWithCredentials()}>Login</Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </React.Fragment>
  )
}

export default LoginPage