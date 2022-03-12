import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ThesisAPIService from '../API/ThesisAPI';
import ProjectsSection from '../components/ProjectsSection';
import CircularLoader from '../components/UI/CircularLoader/CircularLoader';
import { useFetching } from '../hooks/useFetching';

export default function ProjectsPage() {

  const [projects, setProjects] = useState([]);
  const [test, setTest] = useState([]);
  const params = useParams();

  const [fetchProjects, isProjectsLoading, loadError] = useFetching( async () => {
      const response = await ThesisAPIService.getProjectsByDepartmentId(params.id);
      setProjects([...projects, ...response.data]);
      setTest([...test, ...response.data])
      console.log(test);
  });

  useEffect(() => {
      fetchProjects();
      console.log(test);
  }, []);

  return (
    <div>
        <h1>Projects</h1>
        <div className='grid'>
          {isProjectsLoading &&
            <div className='onCeneter'><CircularLoader/></div>}
          <ProjectsSection projects={projects} title="Projects"/>
        </div>
    </div>
  )
}
