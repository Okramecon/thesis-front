import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'

export default function GuestPage() {
  var isLoggedIn = localStorage.getItem('loggedIn')
  return (
    <Box sx={{
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
    }}>
      <Stack
        flexDirection='column'
        direction='column'
        alignContent='center'
      >
        <Typography variant='h5'>
          Welcome to Thesis!
        </Typography>
        {!isLoggedIn && <Typography variant='h6'>
          Register or login to open all functionality!
        </Typography>}
      </Stack>
    </Box>
  )
}
