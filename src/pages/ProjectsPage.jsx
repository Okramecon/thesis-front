import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ThesisAPIService from '../API/ThesisAPI';
import ProjectsSection from '../components/ProjectsSection';
import CircularLoader from '../components/UI/CircularLoader/CircularLoader';
import { useFetching } from '../hooks/useFetching';

export default function ProjectsPage() {

  const [projects, setProjects] = useState([]);
  const params = useParams();

  const [fetchProjects, isProjectsLoading, loadError] = useFetching( async () => {
      const response = await ThesisAPIService.getProjectsByDepartmentId(params.id);
      setProjects([...projects, ...response.data]);
  });

  useEffect(() => {
      fetchProjects();
  }, []);

  return (
      <div className='submain'>
        {isProjectsLoading &&
          <div className='onCeneter'><CircularLoader/></div>}
        <ProjectsSection projects={projects} title="Projects"/>
      </div>
  )
}
