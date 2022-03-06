import React, { useState } from 'react';
import DepartmentCard from './DepartmentCard';
import test from '../images/icons-add.png'
import MyModal from './UI/MyModal/MyModal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ThesisAPIService from '../API/ThesisAPI';

const DepartmentsSection = ({departments, title}) => {

    const [department, setDepartment] = useState({title : "", summary: ""})
    const [addModal, setAddModal] = useState(false);

    const postDepartment = async (department) => {
        const response = await ThesisAPIService.postDepartment(department);
        setAddModal(false);
    }

    const _handleTitleTextFieldChange = function(e) {
        setDepartment({...department, title:e.target.value});
    }
    const _handleSummaryTextFieldChange = function(e) {
        setDepartment({...department, summary:e.target.value});
    }

    if (!departments.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Departments didn't found!
            </h1>
        )
    }

    return (
        <div>
            <MyModal title={"Department form"} visible={addModal} setVisible={setAddModal}>
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
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <div className='cards_container'>
                <div className='grid'>
                    {departments.map((department) =>
                        <DepartmentCard key={department.id} id={department.id} title={department.title} summary={department.summary}/>)}
                        <DepartmentCard key={-1} id={0} title={"Add department"} summary={""} className='addCard'style={{
                            backgroundImage: `url(${test})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            height: '50px',
                            width: '50px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                        onClick={() => setAddModal(true)}/>
                </div>
            </div>
            
        </div>
    );
};


export default DepartmentsSection;