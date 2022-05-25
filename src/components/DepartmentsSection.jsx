import React from 'react';
import CreateDepartmentModal from './CreateDepartmentModal';
import ClickableCard from './UI/ClickableCard/ClickableCard';
import { useNavigate } from 'react-router-dom';

const DepartmentsSection = ({isDepartmentLoading, departments, title, fetchDepartments}) => {

    const navigate = useNavigate();
    if (isDepartmentLoading)
        return(<div></div>);

    const roles = localStorage.getItem('roles').split(',');
    const isDepartmentAdmin = roles.includes('Admin')
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <div className='cards_container'>
                <div className='grid'>
                {
                    departments.map((department) =>
                    <ClickableCard key={department.id} id={department.id} title={department.title} summary={department.summary} onClickAction={() => navigate(`/departments/${department.id}`)}/>)
                }
                { isDepartmentAdmin && <CreateDepartmentModal fetchDepartments={fetchDepartments}/> }
                </div>
            </div>
        </div>
    );
};

export default DepartmentsSection;