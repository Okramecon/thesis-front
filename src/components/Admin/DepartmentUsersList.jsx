import { Button, List, ListItem, Stack, Typography } from '@mui/material'
import ThesisAPIService from 'API/ThesisAPI'
import { AppContext } from 'App'
import AlertSeverities from 'helpers/AlertSeverities'
import React, { useContext, useEffect, useState } from 'react'

function DepartmentUsersList({users, departmentId, fetchUsers}) {
  const setAlertState = useContext(AppContext)

  const isDepartmentAdmin = (roles) => {
    return roles && (roles.includes('DepartmentAdmin') || roles.includes('Admin'))
  }

  const isAdmin = (roles) => {
    return roles && (roles.includes('Admin'))
  }

  const removeUserFromDepartment = (userId) => {
    ThesisAPIService.removeUserFromDepartment(userId, departmentId)
    .then(response => {
      if(response.ok) {
        setAlertState({ alertOpen: true, message: `Removed user from this department!`, severity: AlertSeverities.success})
        fetchUsers()
      } else {
        setAlertState({ alertOpen: true, message: response.message, severity: AlertSeverities.error})   
      }
    })
  }

  const makeUserDepartmentAdmin = (userId) => {
    ThesisAPIService.addUserToRoles(userId, ["DepartmentAdmin"])
    .then(response => {
      if(response.ok) {
        setAlertState({ alertOpen: true, message: `Made user department admin!`, severity: AlertSeverities.success})
        fetchUsers()
      } else {
        setAlertState({ alertOpen: true, message: response.message, severity: AlertSeverities.error})   
      }
    })
  }

  const takeAwayUserDepartmentAdmin = (userId) => {
    ThesisAPIService.removeUserFromRoles(userId, ["DepartmentAdmin"])
    .then(response => {
      if(response.ok) {
        setAlertState({ alertOpen: true, message: `Took away department admin from user!`, severity: AlertSeverities.success})
        fetchUsers()
      } else {
        setAlertState({ alertOpen: true, message: response.message, severity: AlertSeverities.error})   
      }
    })
  }

  return (
    <React.Fragment>
      <Typography>Department users</Typography>
      <List>
        {
          users.map(item => 
            <ListItem key={item.id}>
              <Typography>{item.firstName} {item.lastName}   [{item.userName}]</Typography>
              <Button onClick={() => removeUserFromDepartment(item.id)} sx={{ml:'20px', mr:'5px'}}>
                Remove from department
              </Button>
              {!isAdmin(item.roles) && <Button onClick={() => makeUserDepartmentAdmin(item.id)} sx={{ml:'20px', mr:'5px'}}>
                Make Department Admin
              </Button>}
              {isAdmin(item.roles) && <Button onClick={() => takeAwayUserDepartmentAdmin(item.id)} sx={{ml:'20px', mr:'5px'}}>
                Take Away Department Admin
              </Button>}
            </ListItem>)
        }
      </List>
    </React.Fragment>
  )
}

export default DepartmentUsersList