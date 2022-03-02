import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ThesisAPIService from '../API/ThesisAPI';
import { useFetching } from '../hooks/useFetching';

const DepartmentIdPage = props => {

    const params = useParams();
    const [department, setDepartment] = useState({});

    const [fetchDepartment, isDepartmentLoading, departmentError] = useFetching(async (id) => {
        const response =  await ThesisAPIService.getById(id);
        setDepartment(response.data);
      });

    useEffect(() => {
        fetchDepartment(params.id);
    }, [])

    return (
        <div>
            <h1>{department.title}</h1>
            <p>{department.summary}</p>
        </div>
    );
};

export default DepartmentIdPage;