import { Button, Stack, TextField } from '@mui/material';
import ThesisAPIService from 'API/ThesisAPI';
import { AppContext } from 'App';
import AlertSeverities from 'helpers/AlertSeverities';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

const AddProjectForm = ({closeModal, fetchProjects }) => {
  const setAlertState = useContext(AppContext)
  const { departmentId } = useParams()
  const [project, setProject] = useState({title : "", summary: "", departmentId: departmentId})

  const _handleTitleTextFieldChange = function(e) {
      setProject({...project, title:e.target.value})
  }
  const _handleSummaryTextFieldChange = function(e) {
      setProject({...project, summary:e.target.value})
  }

  const validate = () => {
    let errorMessage = '', valid = true
    if(!project.title || !project.summary) {
      errorMessage = 'Title and summary are required fields!'
      valid = false
    }

    if(!valid) {
      setAlertState({alertOpen: true, message: errorMessage, severity: AlertSeverities.error})
    }

    return valid
  }

  const handleCreate = async () => {
    if(!validate()) {
      return
    }
    ThesisAPIService.postProject(project)
    .then(response => {
      if(response.ok) {
        setAlertState({alertOpen: true, message: response.message, severity: AlertSeverities.success})
        fetchProjects();
        closeModal()
      } else {
        setAlertState({alertOpen: true, message: response.message, severity: AlertSeverities.error})  
      }
    })
  }

  return (
    <Stack direction='column' spacing={2}>  
        <TextField
            required
            id="1"
            label="Name"
            value={project.title}
            onChange={_handleTitleTextFieldChange}
        />
        <TextField
            id="2"
            label="Summary"
            multiline
            rows={4}
            value={project.summary}
            onChange={_handleSummaryTextFieldChange}
        />
        <Button variant="contained" onClick={handleCreate}>Add</Button>
    </Stack>
  );
};

export default AddProjectForm;