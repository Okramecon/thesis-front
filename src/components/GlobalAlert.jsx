import { Alert, Snackbar } from '@mui/material'
import React from 'react'


function GlobalAlert({ alertOpen, closeAlert, message, severity }) {
  return (
    <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => closeAlert()}>
      <Alert onClose={closeAlert} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default GlobalAlert