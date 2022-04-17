import TicketDetailModal from "components/Ticket/TicketDetailModal";
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Box, Grid, Paper, Typography } from "@mui/material";

const TicketCard = ({ task, drag, empty }) => {
  const [open, setOpen] = useState(false)

  const openDetails = () => {
      setOpen(true);
  }

  const title = task.title ?? ''
  const date = new Date(Date.parse(task.createdDatetime));
  const localDate = empty ? '' : date.toLocaleDateString()
  const time = empty ? '' : date.getHours() + ':' + date.getMinutes()

  return (
    <React.Fragment>
      <Paper
        elevation={3}
        onClick={() => openDetails()}
        sx={{backgroundColor: 'white', p: '5px', mt: '5px', mb: '5px'}}
      >
        <Grid container justify="space-between" direction='column'>
          <Typography>{title}</Typography>
          <Typography color='grey.600' inline variant='caption' align='right'>{localDate + '  ' + time}</Typography>
        </Grid>
      </Paper>
      <TicketDetailModal task={task} open={open} handleClose={() => setOpen(false)}/>
    </React.Fragment>)
};

TicketCard.propTypes = {
    task: PropTypes.object,
    empty: PropTypes.bool,
    drag: PropTypes.bool
}

export default TicketCard;