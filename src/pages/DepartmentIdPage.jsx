import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ThesisAPIService from '../API/ThesisAPI';
import { useFetching } from '../hooks/useFetching';
import Button from '@mui/material/Button';

const DepartmentIdPage = props => {

    const params = useParams();
    const [department, setDepartment] = useState({});

    const [fetchDepartment, isDepartmentLoading, departmentError] = useFetching(async (id) => {
        const response =  await ThesisAPIService.getDepartmentById(id);
        setDepartment(response.data);
      });

    useEffect(() => {
        fetchDepartment(params.departmentId);
    }, [])

    const navigate = useNavigate();

    return (
        <div>
            <h1>{department.title}</h1>
            <p>{department.summary}</p>
            <Button onClick={() => navigate(`/departments/${params.departmentId}/projects`)}>Projects</Button>
        </div>
    );
};

export default DepartmentIdPage;