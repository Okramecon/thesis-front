import { Button, Grid, Paper, TextField } from "@mui/material"
import { Box } from "@mui/system"
import ThesisAPIService from "API/ThesisAPI"
import { AppContext } from "App"
import AlertSeverities from "helpers/AlertSeverities"
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

function LoginForm({ setLoggedIn }) {
  const [loginCredentials, setLoginCredentials] = useState({login:'', password:''})
  const {login, password} = loginCredentials
  const setAlertState = useContext(AppContext)

  const validateLoginCredentials = () => {
    return login && password
  }

  const loginWithCredentials = () => {

    if(validateLoginCredentials()) {
      ThesisAPIService.loginWithCredentials(loginCredentials)
      .then(response => {
        if(response.ok) {
          localStorage.setItem('bearer', 'Bearer ' + response.bearer)
          localStorage.setItem('username', response.userName)
          localStorage.setItem('loggedIn', true)
          localStorage.setItem('expires', response.expires)
          console.log(response.expires)
          setAlertState({ alertOpen: true, message: 'Successfully logged in!', severity: AlertSeverities.success})
          setLoggedIn(true)
          return
        } else {
          setAlertState({ alertOpen: true, message: response.message, severity: AlertSeverities.error})   
          return
        }
      })
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
              <Button variant="contained" onClick={loginWithCredentials}>Login</Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </React.Fragment>
  )
}

export default LoginForm