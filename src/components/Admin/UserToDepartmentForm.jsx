import { Box, Button, TextField } from '@mui/material'
import ThesisAPIService from 'API/ThesisAPI'
import { AppContext } from 'App'
import AlertSeverities from 'helpers/AlertSeverities'
import React, { useContext, useState } from 'react'

function UserToDepartmentForm({ departmentId, fetchUsers }) {
  const setAlertState = useContext(AppContext)
  const [userEmail, setUserEmail] = useState('')

  const handleEmailChange = function(e) {
    setUserEmail(e.target.value)
  }

  const addUserToDepartment = () => {
    if(!userEmail) return
    ThesisAPIService.addUserToDepartmentByEmail(userEmail, departmentId)
    .then(response => {
      if(response.ok) {
        setAlertState({ alertOpen: true, message: `Added ${userEmail} to this department!`, severity: AlertSeverities.success})
        fetchUsers()
      } else {
        setAlertState({ alertOpen: true, message: response.message, severity: AlertSeverities.error})   
      }
    })
  }

  return (
    <React.Fragment>
      <Box>
        <TextField
          required
          id="1"
          label="email"
          value={userEmail}
          onChange={handleEmailChange}
          size='small'
          placeholder='user email'
        />
        <Button onClick={addUserToDepartment} sx={{ml:'5px', mr:'5px'}}>
          Add User to department
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default UserToDepartmentForm