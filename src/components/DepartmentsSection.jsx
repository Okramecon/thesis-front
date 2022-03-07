import React, { useState } from 'react';
import DepartmentCard from './DepartmentCard';
import addIcon from '../images/icons-add.png'
import AddDepartmentForm from './AddDepartmentForm';

const DepartmentsSection = ({isDepartmentLoading, departments, title}) => {

    const [addModal, setAddModal] = useState(false);

    if (isDepartmentLoading)
        return(<div></div>);

    if (!departments.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Departments didn't found!
            </h1>
        )
    }

    return (
        <div>
            <AddDepartmentForm modal={addModal} setModal={setAddModal}/>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <div className='cards_container'>
                <div className='grid'>
                    {departments.map((department) =>
                        <DepartmentCard key={department.id} id={department.id} title={department.title} summary={department.summary}/>)}
                        <DepartmentCard key={-1} id={0} isAdditionalCard='true' className='addCard' style={{
                            backgroundImage: `url(${addIcon})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            height: '50px',
                            width: '50px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            margin: "auto"
                        }}
                        onClick={() => setAddModal(true)}/>
                </div>
            </div>
            
        </div>
    );
};


export default DepartmentsSection;