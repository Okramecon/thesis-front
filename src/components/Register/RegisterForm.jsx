import { Button, TextField } from '@mui/material'
import ThesisAPIService from 'API/ThesisAPI'
import React, { useState } from 'react'

function RegisterForm() {
  const [registerData, setRegisterData] = useState({})
  const { email, password, passwordConfirmation } = registerData

  const handleEmailChange = function(e) {
    setRegisterData({...registerData, email:e.target.value})
  }
  const handlePasswordChange = function(e) {
    setRegisterData({...registerData, password:e.target.value})
  }
  const handlePasswordConfirmationChange = function(e) {
    setRegisterData({...registerData, passwordConfirmation:e.target.value})
  }

  const register = async () => {
    if(!password || password != passwordConfirmation) {
      alert("Password cannot be empty and password confirmation should match password")
      return
    }
    if(!email) {
      alert("Email field must filled")
      return
    }

    //request
    var response = await ThesisAPIService.registerNewUser({ email, password }) 
    alert(response)
  }

  return (
    <div>
      <TextField
        required
        id="1"
        label="email"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        id="2"
        label="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <TextField
        id="3"
        label="confirm password"
        type="password"
        value={passwordConfirmation}
        onChange={handlePasswordConfirmationChange}
      />
      <Button variant="contained" onClick={register}>Register</Button>
    </div>
  )
}

export default RegisterForm