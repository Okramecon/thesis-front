import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ThesisAPIService from "../../../API/ThesisAPI";
import ClickableCard from "../../UI/ClickableCard/ClickableCard";
import CreateProjectModal from "../../Projects/CreateProjectModal";
import {useNavigate} from "react-router-dom";

const DepartmentProjects = props => {

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const fetchProjects = () => {
    ThesisAPIService.getProjectsByDepartmentId(props.departmentId)
        .then(response => {
          
          if(response.ok) {
            setProjects(response.data);
          } else {
            navigate('/departments')
          }
        });
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const onProjectClick = (projectId) => {
    //navigate(`/project/${projectId}`)
    openInNewTab(`/project/${projectId}`)
  }

  const roles = localStorage.getItem('roles');
  const isDepartmentAdmin = roles.includes('Admin') || roles.includes('DepartmentAdmin')

  return (
      <div>
        <div className='cards_container'>
          <div className='grid'>
            {projects.map((project) =>
                <ClickableCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    summary={project.summary}
                    onClickAction={() => onProjectClick(project.id)}/>)}
          </div>
        </div>
        { isDepartmentAdmin && <CreateProjectModal fetchProjects={fetchProjects}/> }
      </div>
  );
};

DepartmentProjects.propTypes = {
  departmentId: PropTypes.number
};

export default DepartmentProjects;