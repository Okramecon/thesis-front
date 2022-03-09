import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';
import ThesisAPIService from '../API/ThesisAPI';

function LoginPage() {
  const [loginCredentials, setLoginCredentials] = useState({login:'', password:''})
  const {login, password} = loginCredentials

  const loginWithCredentials = () => {
    ThesisAPIService.loginWithCredentials(loginCredentials)
  }

  return (
    <Stack 
      component="form"
      sx={{
       '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      alignItems="center"
      direction="column"
      display="flex"
    >
      <TextField 
        id="1" 
        required
        label="Login"
        value={login}
        onChange={e => setLoginCredentials({...loginCredentials, login:e.target.value})}
      />
      <TextField 
        id="2"
        required
        label="Password"
        value={password}
        type="password"
        autoComplete="current-password"
        onChange={e => setLoginCredentials({...loginCredentials, password:e.target.value})}
      />
      <Button color="inherit" onClick={() => loginWithCredentials()}>Login</Button>
      <p>АКРАМ Я НЕ ЗНАЮ КАК ВЫРОВНЯТЬ ФОРМУ ПО СЕРЕДИНЕ </p>
    </Stack>
  )
}

export default LoginPage