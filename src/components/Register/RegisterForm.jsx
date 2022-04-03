import { Button, TextField } from '@mui/material'
import ThesisAPIService from 'API/ThesisAPI'
import { AppContext } from 'App'
import AlertSeverities from 'helpers/AlertSeverities'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterForm({ closeModal }) {
  const [registerData, setRegisterData] = useState({})
  const { email, password, passwordConfirmation } = registerData
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

    if(!isValid) {
      setAlertState({alertOpen: true, message: errorMessage, severity: AlertSeverities.error})
    }

    return isValid
  }

  const register = async () => {
    // if(!isRegistrationDataValid(email, password, passwordConfirmation)) {
    //   return
    // }

    var response = await ThesisAPIService.registerNewUser({ email, password })

    if(response.ok) {
      setAlertState({alertOpen: true, message: 'Confirmation code sent to your email', severity: AlertSeverities.success, duration: 6000})
      closeModal();
      navigate("/successRegistration")
    } else {
      setAlertState({alertOpen: true, message: response.message, severity: AlertSeverities.error})
    }
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
      <Button variant="contained" onClick={async () => await register()}>Register</Button>
    </div>
  )
}

export default RegisterForm