import React, { useState } from 'react'
import DepartmentCard from './DepartmentCard'
import addIcon from '../images/icons-add.png'

export default function ProjectsSection(projects, title) {
    console.log(title)

    // if (projects.length) {
    //     return (
    //         <h1 style={{textAlign: 'center'}}>
    //             No projects.
    //         </h1>
    //     )
    // }

    //const [addModal, setAddModal] = useState(false);

    return (
        <div className='grid'>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <div className='cards_container'>
                <div className='grid'>
                    {projects.map((project) =>
                        <DepartmentCard key={project.id} id={project.id} title={project.title} summary={project.summary}/>)}
                        {/* <DepartmentCard key={-1} id={0} isAdditionalCard='true' className='addCard' style={{
                            backgroundImage: `url(${addIcon})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            height: '50px',
                            width: '50px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            margin: "auto"
                        }}
                        onClick={() => setAddModal(true)}/> */}
                </div>
            </div>
        </div>
    )
}
