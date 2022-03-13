import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import ThesisAPIService from '../API/ThesisAPI';
import Button from '@mui/material/Button';
import { AppContext } from '../App';
import AlertSeverities from '../helpers/AlertSeverities';

const AddDepartmentForm = ({closeModal, fetchDepartments}) => {
    const setAlertState = useContext(AppContext)
    const [department, setDepartment] = useState({title : "", summary: ""})

    const postDepartment = async (department) => {
        const response = await ThesisAPIService.postDepartment(department)
    }

    const _handleTitleTextFieldChange = function(e) {
        setDepartment({...department, title:e.target.value})
    }
    const _handleSummaryTextFieldChange = function(e) {
        setDepartment({...department, summary:e.target.value})
    }

    const handleCreate = async () => {
      try { 
        await postDepartment(department)
        setAlertState({alertOpen: true, message: 'Department created', severity: AlertSeverities.success})
      } catch(e) {
        setAlertState({alertOpen: true, message: 'Department not created because of error', severity: AlertSeverities.error})
      } finally {
        await fetchDepartments()
        closeModal()
      }
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