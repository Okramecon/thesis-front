import React, { useState } from 'react';
import { useEffect } from 'react';
import ThesisAPIService from '../API/ThesisAPI';
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DepartmentProfile from "../components/Department/DepartmentProfile/DepartmentProfile";
import DepartmentStaff from "../components/Department/DepartmentStaff/DepartmentStaff";
import DepartmentProjects from "../components/Department/DepartmentProjects/DepartmentProjects";
import {useParams} from "react-router-dom";

const mainStyle = {
  boxShadow: "1px 4px 5px 1px rgba(0,0,0,0.2)",
  border: "2px solid #f5f5f5"
}

const DepartmentIdPage = () => {
  const params = useParams();
  const [tabValue, setTabValue] = useState("profile");
  const [department, setDepartment] = useState({});

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

  const roles = localStorage.getItem('roles');
  const isDepartmentAdmin = roles.includes('Admin') || roles.includes('DepartmentAdmin')

  return (
    <div style={mainStyle}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1,  height:'auto', borderColor: 'divider' }}>
          <TabList onChange={handleTabValueChange} aria-label="lab API tabs">
            <Tab label="Profile" value="profile" />
            <Tab label="Projects" value="projects" />
            { isDepartmentAdmin && <Tab label="Staff" value="staff" /> }
          </TabList>
        </Box>
        <TabPanel value="profile">
          <DepartmentProfile department={department}/>
        </TabPanel>
        <TabPanel value="projects">
          <DepartmentProjects departmentId={department.id}/>
        </TabPanel>
        <TabPanel value="staff">
          <DepartmentStaff departmentId={department.id}/>
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default DepartmentIdPage;