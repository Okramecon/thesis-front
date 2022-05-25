import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import TabContext from "@mui/lab/TabContext";
import {Box} from "@mui/material";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import ProjectProfile from "../components/Projects/ProjectProfile/ProjectProfile";
import ThesisAPIService from "../API/ThesisAPI";
import ProjectBoard from "../components/Projects/ProjectBoard/ProjectBoard";

const mainStyle = {
  boxShadow: "1px 4px 5px 1px rgba(0,0,0,0.2)",
  border: "2px solid #f5f5f5"
}

const ProjectIdPage = props => {

  const params = useParams();
  const [tabValue, setTabValue] = useState("profile");
  const [project, setProject] = useState({});
  const navigate = useNavigate()
  const fetchProject = (id) => {
    ThesisAPIService.getProjectById(id)
        .then(response => {
          if(response.ok) {
            setProject(response.data);
          } else {
            navigate('/departments')
          }
        })
  }

  useEffect(() => {
    fetchProject(params.projectId);
  }, [])

  const handleTabValueChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
      <div style={mainStyle}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1,  height:'auto', borderColor: 'divider' }}>
            <TabList onChange={handleTabValueChange} aria-label="lab API tabs">
              <Tab label="Profile" value="profile" />
              <Tab label="Board" value="board" />
            </TabList>
          </Box>
          <TabPanel value="profile">
            <ProjectProfile project={project}/>
          </TabPanel>
          <TabPanel value="board">
            <ProjectBoard projectId={project.id}/>
          </TabPanel>
        </TabContext>
      </div>
  );
};

ProjectIdPage.propTypes = {
  projectId: PropTypes.number
};

export default ProjectIdPage;