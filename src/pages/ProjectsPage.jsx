import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ThesisAPIService from '../API/ThesisAPI';
import ProjectsSection from '../components/Projects/ProjectsSection';
import CircularLoader from '../components/UI/CircularLoader/CircularLoader';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const params = useParams();

  const fetchProjects = () => {
    ThesisAPIService.getProjectsByDepartmentId(params.departmentId)
    .then(response => {
      setProjects(response.data)
    })
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className='submain'>
      <ProjectsSection projects={projects} title="Projects" fetchProjects={fetchProjects}/>
    </div>
  )
}
