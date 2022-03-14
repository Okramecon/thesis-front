import React, { useEffect, useState } from 'react';
import { useFetching } from '../hooks/useFetching';
import ThesisAPIService from '../API/ThesisAPI';
import DepartmentsSection from '../components/DepartmentsSection';
import CircularLoader from '../components/UI/CircularLoader/CircularLoader';

const Departments = () => {
    const [departments, setDepartmnets] = useState([]);

    const [fetchDepartments, isDepartmentLoading, departmentError] = useFetching(async () => {
            const response =  await ThesisAPIService.getAll();
            setDepartmnets(response.data);
      });
    
    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <div className='submain'>
            {isDepartmentLoading &&
                <div className='onCenter'><CircularLoader/></div>}
            <DepartmentsSection isDepartmentLoading={isDepartmentLoading} departments={departments} title="Departments" fetchDepartments={fetchDepartments}/>
        </div>
    );
};

export default Departments;