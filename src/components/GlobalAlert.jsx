import { Alert, Snackbar } from '@mui/material'
import React from 'react'


function GlobalAlert({ alertOpen, closeAlert, message, severity, duration }) {
  if(!duration) {
    duration = 3000
  }
  return (
    <Snackbar open={alertOpen} autoHideDuration={duration} onClose={() => closeAlert()}>
      <Alert onClose={closeAlert} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default GlobalAlert