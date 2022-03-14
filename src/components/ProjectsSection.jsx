import React, { useState } from 'react'
import addIcon from '../images/icons-add.png'
import ClickableCard from './UI/ClickableCard/ClickableCard'

export default function ProjectsSection({projects, title}) {

    const [addModal, setAddModal] = useState(false);

    if (projects.length === 0) {
        return (
            <h1 style={{textAlign: 'center'}}>
                No projects.
            </h1>
        )
    }


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
                        <ClickableCard
                            key={-1}
                            id={0}
                            isAdditionalCard='true'
                            className='addCard'
                            onClickAction={() => setAddModal(true)}>
                        <div className='addCardContent'></div></ClickableCard>
                </div>
            </div>
        </div>
    )
}
