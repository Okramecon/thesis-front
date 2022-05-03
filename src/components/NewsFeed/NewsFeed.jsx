import { Box, Typography } from '@mui/material'
import React from 'react'
import NewsSection from './NewsSection'

export default function NewsFeed({ departmentId }) {

  if (departmentId === undefined)
    return (<></>);

  return (
    <Box>
      <Typography variant='h5' sx={{margin:'10px'}}> News </Typography>

      <NewsSection departmentId={departmentId}/>

    </Box>
  )
}
