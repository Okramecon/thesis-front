import React, { useEffect, useState } from 'react';
import { useFetching } from '../hooks/useFetching';
import ThesisAPIService from '../API/ThesisAPI';
import DepartmentsSection from '../components/DepartmentsSection';

const Departments = props => {
    const [departments, setDepartmnets] = useState([]);

    const [fetchDepartments, isDepartmentLoading, departmentError] = useFetching(async () => {
        const response =  await ThesisAPIService.getAll();
        setDepartmnets([...departments, ...response.data]);
      });
    
    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <div className='test'>
            <DepartmentsSection departments={departments} title="Departments"/>
        </div>
    );
};

Departments.propTypes = {
    
};

export default Departments;