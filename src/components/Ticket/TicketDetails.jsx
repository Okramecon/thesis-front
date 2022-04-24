import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CommentsWindow from "../CommentsWindow/CommentsWindow";
import ThesisAPIService from "../../API/ThesisAPI";
import AlertSeverities from "../../helpers/AlertSeverities";
import {AppContext} from "../../App";
import { Divider, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function TicketDetails(props) {
  const [toggled, setToggled] = React.useState(true);
  const [status, setStatus] = React.useState(props.task.status);
  const setAlertState = useContext(AppContext);

  const handleStatusChange = (event) => {

    ThesisAPIService.UpdateTask({ ...props.task, status: event.target.value })
    .then(response => {
      if(response.ok) {
        setStatus(event.target.value);
        props.task.status = event.target.value;
        setAlertState({ alertOpen: true, message: 'Successfully saved changes!', severity: AlertSeverities.success})
        props.closeModal()
        return
      }
      setAlertState({ alertOpen: true, message: response.message, severity: AlertSeverities.error})
    })
  };

  return (
    <React.Fragment>
      <Stack spacing={1} direction='column' sx={{height: 1}}>
        <Stack direction='row' spacing={2}>
          <Typography variant='h5' flexGrow={1}>[Id: {props.task.id}] {props.task.title}</Typography>
          <FormControl size='small' sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='select-label'>Status</InputLabel>
            <Select
              labelId='select-label'
              value={status}
              label='Status'
              onChange={handleStatusChange}
            >
              <MenuItem value={0}>New</MenuItem>
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={2}>Completed</MenuItem>
            </Select>
          </FormControl>

          <IconButton>
            <EditIcon />
          </IconButton>
        </Stack>

        <Stack sx={{border: 1, borderRadius: '3px', p: '10px', pt: '4px', pb: '4px'}}>
          <Stack direction='row'>
            <Typography flexGrow={1}>Details</Typography>
          </Stack>
          <Divider/>
          {toggled && <Typography>{props.task.details}</Typography>}
        </Stack>
        <Box>
          <CommentsWindow taskId={props.task.id}/>
        </Box>
      </Stack>
    </React.Fragment>
  )
}

TicketDetails.propTypes = {
  task: PropTypes.object
}
