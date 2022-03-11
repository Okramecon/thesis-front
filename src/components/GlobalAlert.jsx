import { Alert, Snackbar } from '@mui/material'
import React from 'react'


function GlobalAlert({ loginAlertOpen, closeAlert, message, severity }) {
  return (
    <Snackbar open={loginAlertOpen} autoHideDuration={3000} onClose={() => closeAlert()}>
      <Alert onClose={closeAlert} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default GlobalAlert