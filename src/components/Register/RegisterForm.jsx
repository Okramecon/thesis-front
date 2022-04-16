import { Button, Stack, TextField } from '@mui/material'
import ThesisAPIService from 'API/ThesisAPI'
import { AppContext } from 'App'
import AlertSeverities from 'helpers/AlertSeverities'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterForm({ closeModal }) {
  const [registerData, setRegisterData] = useState({})
  const { email, password, passwordConfirmation, firstName, lastName } = registerData
  const setAlertState = useContext(AppContext)
  const navigate = useNavigate();

  const handleEmailChange = function(e) {
    setRegisterData({...registerData, email:e.target.value})
  }
  const handlePasswordChange = function(e) {
    setRegisterData({...registerData, password:e.target.value})
  }
  const handlePasswordConfirmationChange = function(e) {
    setRegisterData({...registerData, passwordConfirmation:e.target.value})
  }
  const handleFirstNameChange = function(e) {
    setRegisterData({...registerData, firstName:e.target.value})
  }
  const handleLastNameChange = function(e) {
    setRegisterData({...registerData, lastName:e.target.value})
  }

  const isRegistrationDataValid = (email, password, passwordConfirmation) => {
    var isValid = true
    var errorMessage = ""
    if(!password) {
      errorMessage = "Password must be non-empty"
      isValid = false
    }

    if(password < 6) {
      errorMessage = "Password length must be more than 6"
      isValid = false
    }

    if(password !== passwordConfirmation) {
      errorMessage = "Password and confirmation do not match"
      isValid = false
    }

    if(!email) {
      errorMessage = 'Email field must filled'
      isValid = false
    }

    if(!firstName) {
      errorMessage = 'First name field must filled'
      isValid = false
    }

    if(!lastName) {
      errorMessage = 'Last name field must filled'
      isValid = false
    }

    if(!isValid) {
      setAlertState({alertOpen: true, message: errorMessage, severity: AlertSeverities.error, duration: 4000})
    }

    return isValid
  }

  const register = () => {
    if(!isRegistrationDataValid(email, password, passwordConfirmation)) {
      return
    }

    ThesisAPIService.registerNewUser(registerData)
    .then(response => {
      if(response.ok) {
        setAlertState({alertOpen: true, message: response.message, severity: AlertSeverities.success, duration: 6000})
        closeModal();
        navigate("/successRegistration")
      } else {
        setAlertState({alertOpen: true, message: response.message, severity: AlertSeverities.error})
      }
    })
  }

  return (
    <Stack spacing={1}>
      <TextField
        required
        id="1"
        label="email"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        required
        id="2"
        label="first name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <TextField
        required
        id="3"
        label="last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <TextField
      required
        id="4"
        label="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <TextField
        required
        id="5"
        label="confirm password"
        type="password"
        value={passwordConfirmation}
        onChange={handlePasswordConfirmationChange}
      />
      <Button variant="contained" onClick={register}>Register</Button>
    </Stack>
  )
}

export default RegisterForm