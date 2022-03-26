import ClickableCard from 'components/UI/ClickableCard/ClickableCard';
import React, { useState } from 'react'
import CreateProjectModal from './CreateProjectModal';

export default function ProjectsSection({projects, title, fetchProjects}) {

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>
        {title}
      </h1>
      <div className='cards_container'>
        <div className='grid'>
          {projects.map((project) =>
            <ClickableCard
              key={project.id}
              id={project.id}
              title={project.title}
              summary={project.summary}/>)}
        </div>
      </div>
      <CreateProjectModal fetchProjects={fetchProjects}/>
    </div>
  )
}
