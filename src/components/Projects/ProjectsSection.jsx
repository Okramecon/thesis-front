import React from "react";
import ClickableCard from 'components/UI/ClickableCard/ClickableCard';
import { useNavigate } from 'react-router-dom';
import CreateProjectModal from './CreateProjectModal';

export default function ProjectsSection({projects, fetchProjects}) {
 
  const navigate = useNavigate();

  const onProjectClick = (id) => {
    navigate(`/project/${id}/taskboard`)
  }

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
      <CreateProjectModal fetchProjects={fetchProjects}/>
    </div>
  )
}
