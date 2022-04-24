import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import ThesisAPIService from '../API/ThesisAPI';
import Button from '@mui/material/Button';
import { AppContext } from '../App';
import AlertSeverities from '../helpers/AlertSeverities';

const AddDepartmentForm = ({closeModal, fetchDepartments}) => {
    const setAlertState = useContext(AppContext)
    const [department, setDepartment] = useState({title : "", summary: ""})

    const _handleTitleTextFieldChange = function(e) {
        setDepartment({...department, title:e.target.value})
    }
    const _handleSummaryTextFieldChange = function(e) {
        setDepartment({...department, summary:e.target.value})
    }

    const validate = () => {
      let errorMessage = '', valid = true
      if(!department.title || !department.summary) {
        errorMessage = 'Title and summary are required fields!'
        valid = false
      }

      if(!valid) {
        setAlertState({alertOpen: true, message: errorMessage, severity: AlertSeverities.error})
      }

      return valid
    }

    const handleCreate = () => {
      if(!validate()) {
        return
      }

      ThesisAPIService.postDepartment(department)
      .then(response => {
        if(response.ok) {
          setAlertState({alertOpen: true, message: response.message, severity: AlertSeverities.success})
          fetchDepartments()
          closeModal()
        } else {
          setAlertState({alertOpen: true, message: response.message, severity: AlertSeverities.error})
        }
      })
    }

    return (
      <div className='departmentForm'>  
          <TextField
              required
              id="1"
              label="Name"
              value={department.title}
              onChange={_handleTitleTextFieldChange}
          />
          <TextField
              id="2"
              label="Summary"
              multiline
              rows={4}
              value={department.summary}
              onChange={_handleSummaryTextFieldChange}
          />
          <Button variant="contained" onClick={handleCreate}>Add</Button>
      </div>
    );
};

export default AddDepartmentForm;