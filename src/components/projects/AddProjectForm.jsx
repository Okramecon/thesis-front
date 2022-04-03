import { Button, TextField } from '@mui/material';
import ThesisAPIService from 'API/ThesisAPI';
import { AppContext } from 'App';
import AlertSeverities from 'helpers/AlertSeverities';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

const AddProjectForm = ({closeModal, fetchProjects }) => {
    const setAlertState = useContext(AppContext)
    const { departmentId } = useParams()
    const [project, setProject] = useState({title : "", summary: "", departmentId: departmentId})

    const postProject = async (project) => {
        const response = await ThesisAPIService.postProject(project)
    }

    const _handleTitleTextFieldChange = function(e) {
        setProject({...project, title:e.target.value})
    }
    const _handleSummaryTextFieldChange = function(e) {
        setProject({...project, summary:e.target.value})
    }

    const handleCreate = async () => {
      try { 
        await postProject(project)
        setAlertState({alertOpen: true, message: 'Project created', severity: AlertSeverities.success})
      } catch(e) {
        setAlertState({alertOpen: true, message: 'Project not created because of error', severity: AlertSeverities.error})
      } finally {
        await fetchProjects();
        closeModal()
      }
    }

    return (
      <div className='projectForm'>  
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
      </div>
    );
};

export default AddProjectForm;