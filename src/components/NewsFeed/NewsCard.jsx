import { Box, Typography } from '@mui/material'
import React from 'react'

function NewsCard({ item }) {
  const { title, body, author, createdDateTime } = item

  const localDateTime = new Date(createdDateTime)

  return (
    <Box sx={{ padding: '10px', border: 1, borderColor: 'grey.200', flexGrow: 1 }}> 
      <Typography variant='h6'> {title} </Typography>
      <Box sx={{backgroundColor:'grey.50', padding: '3px', wordWrap:'break-word'}}>
        <Typography> {body} </Typography>
      </Box>
      <Typography> {author?.userName} </Typography>
      <Typography variant='caption'> {localDateTime.toDateString()} </Typography>
    </Box>
  )
}

export default NewsCard