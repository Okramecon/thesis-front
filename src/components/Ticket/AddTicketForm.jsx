import { Button, Stack, TextField } from '@mui/material';
import ThesisAPIService from 'API/ThesisAPI';
import { AppContext } from 'App';
import AlertSeverities from 'helpers/AlertSeverities';
import React, { useContext, useState } from 'react';


const AddTicketForm = ({closeModal, fetchTickets, boardId}) => {
  const setAlertState = useContext(AppContext)
  const [ticket, setTicket] = useState({title : "", details: "", status: 0, boardId: boardId})

  const _handleTitleTextFieldChange = function(e) {
      setTicket({...ticket, title:e.target.value})
  }
  const _handleDetailsTextFieldChange = function(e) {
      setTicket({...ticket, details:e.target.value})
  }

  const handleCreate = () => { 
    ThesisAPIService.createTicket(ticket)
    .then(response => {
      if(response.ok) {
        setAlertState({alertOpen: true, message: response.message, severity: AlertSeverities.success})
        fetchTickets()
        closeModal()
      } else {
        setAlertState({alertOpen: true, message: response.message, severity: AlertSeverities.error})
      }
    })
  }

  return (
    <Stack spacing={1}>  
      <TextField
        required
        id="1"
        label="Name"
        value={ticket.title}
        onChange={_handleTitleTextFieldChange}
      />
      <TextField
        id="2"
        label="Details"
        multiline
        rows={4}
        value={ticket.details}
        onChange={_handleDetailsTextFieldChange}
      />
      <Button variant="contained" onClick={handleCreate}>Add</Button>
    </Stack>
  );
};

export default AddTicketForm;