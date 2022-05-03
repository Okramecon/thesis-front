import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ThesisAPIService from "../../../API/ThesisAPI";
import ProjectsSection from "../../Projects/ProjectsSection";

const DepartmentProjects = props => {

  const [projects, setProjects] = useState([]);

  const fetchProjects = () => {
    ThesisAPIService.getProjectsByDepartmentId(props.departmentId)
        .then(response => {
          setProjects(response.data);
        })
  }

  useEffect(() => {
    fetchProjects();
  }, [props.departmentId]);

  return (
      <ProjectsSection projects={projects} fetchProjects={fetchProjects}/>
  );
};

DepartmentProjects.propTypes = {
  departmentId: PropTypes.number
};

export default DepartmentProjects;