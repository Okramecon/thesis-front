import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import ThesisAPIService from '../API/ThesisAPI';
import MyModal from './UI/MyModal/MyModal';
import Button from '@mui/material/Button';

const AddDepartmentForm = (props) => {
    
    const [department, setDepartment] = useState({title : "", summary: ""})

    const postDepartment = async (department) => {
        const response = await ThesisAPIService.postDepartment(department);
        props.setModal(false);
    }

    const _handleTitleTextFieldChange = function(e) {
        setDepartment({...department, title:e.target.value});
    }
    const _handleSummaryTextFieldChange = function(e) {
        setDepartment({...department, summary:e.target.value});
    }

    return (
        <div>
            <MyModal title={"Department form"} visible={props.modal} setVisible={props.setModal}>
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
                    <Button variant="contained" onClick={async () => await postDepartment(department)}>Add</Button>
                </div>
            </MyModal>
        </div>
    );
};

export default AddDepartmentForm;