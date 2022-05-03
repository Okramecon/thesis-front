import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ThesisAPIService from '../API/ThesisAPI';
import Button from '@mui/material/Button';
import NewsFeed from 'components/NewsFeed/NewsFeed';
import { Box, Divider, Typography } from '@mui/material';
import UserToDepartmentForm from 'components/Admin/UserToDepartmentForm';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DepartmentProfile from "../components/Department/DepartmentProfile/DepartmentProfile";
import DepartmentStaff from "../components/Department/DepartmentStaff/DepartmentStaff";
import DepartmentProjects from "../components/Department/DepartmentProjects/DepartmentProjects";

const DepartmentIdPage = () => {
  const params = useParams();
  const [tabValue, setTabValue] = useState("profile");
  const [department, setDepartment] = useState({});
  const navigate = useNavigate();

  const fetchDepartment = (id) => {
    ThesisAPIService.getDepartmentById(id)
    .then(response => {
      setDepartment(response.data);
    })
  }

  useEffect(() => {
    fetchDepartment(params.departmentId);
  }, [])

  const handleTabValueChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ padding: '10px', height: 'auto', border: 1, borderColor: 'grey.200', flexGrow: 1}}>
      {/*<Button sx={{ marginTop: '5px', mb: '8px'}} variant='outlined' onClick={() => navigate(`/departments/${params.departmentId}/projects`)}>Projects</Button>*/}
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1,  height:'auto', borderColor: 'divider' }}>
          <TabList onChange={handleTabValueChange} aria-label="lab API tabs">
            <Tab label="Profile" value="profile" />
            <Tab label="Projects" value="projects" />
            <Tab label="Staff" value="staff" />
          </TabList>
        </Box>
        <TabPanel sx={{height:'auto'}} value="profile">
          <DepartmentProfile department={department}/>
        </TabPanel>
        <TabPanel value="projects">
          <DepartmentProjects departmentId={department.id}/>
        </TabPanel>
        <TabPanel value="staff">
          <DepartmentStaff departmentId={department.id}/>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default DepartmentIdPage;