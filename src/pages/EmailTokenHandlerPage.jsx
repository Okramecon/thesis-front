import ThesisAPIService from 'API/ThesisAPI'
import { AppContext } from 'App'
import AlertSeverities from 'helpers/AlertSeverities'
import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EmailTokenHandlerPage() {
  const { token } = useParams()
  const navigate = useNavigate()
  const setAlertState = useContext(AppContext)

  const handleEmailToken = (token) => {
    ThesisAPIService.handleEmailToken(token)
    .then(response => {
      if(response.ok) {
        setAlertState({alertOpen: true, message: response.message, severity: AlertSeverities.success, duration: 15000})
      } else {
        setAlertState({alertOpen: true, message: response.message, severity: AlertSeverities.error, duration: 15000})
      }
      navigate('/')
    })
  }
  useEffect(() => {
    handleEmailToken(token)
  }, [])

  return (
    <div>Email Confirmation Page</div>
  )
}

export default EmailTokenHandlerPage