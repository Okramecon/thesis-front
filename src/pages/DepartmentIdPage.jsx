import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ThesisAPIService from '../API/ThesisAPI';
import { useFetching } from '../hooks/useFetching';
import Button from '@mui/material/Button';
import NewsFeed from 'components/NewsFeed/NewsFeed';
import { Box, Divider, Typography } from '@mui/material';

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
      <Box sx={{ padding: '10px', border: 1, borderColor: 'grey.200', flexGrow: 1}}>
        <Typography sx={{ margin: '4px'}} variant='h4'>{department.title}</Typography>
        <Typography sx={{ margin: '4px'}}>{department.summary}</Typography>
        <Button sx={{ margin: '4px', mb: '8px'}} variant='outlined' onClick={() => navigate(`/departments/${params.departmentId}/projects`)}>Projects</Button>
        <Divider/>
        <NewsFeed departmentId={params.departmentId}/>
      </Box>
    );
};

export default DepartmentIdPage;