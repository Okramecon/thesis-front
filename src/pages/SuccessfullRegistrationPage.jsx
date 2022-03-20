import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function SuccessfullRegistrationPage() {
  const navigate = useNavigate();

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
        <Typography variant='h6'>
          Successfully registered! Email confirmation has been sent to your email
        </Typography>
        <Button onClick={() => navigate('/')} variant='contained' size='medium' sx={{
            flexGrow: 0
          }}
        >
          Home
        </Button>
      </Stack>
    </Box>
  )
}

export default SuccessfullRegistrationPage