import { List, ListItem, Stack, Typography } from '@mui/material'
import ThesisAPIService from 'API/ThesisAPI'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function DepartmentUsersList({users}) {

  return (
    <React.Fragment>
      <Typography>DepartmentUsersList</Typography>
      <List>
        {
          users.map(item => 
            <ListItem key={item.id}>
              <Typography>{item.firstName} {item.lastName}   [{item.userName}]</Typography>
            </ListItem>)
        }
      </List>
    </React.Fragment>
  )
}

export default DepartmentUsersList