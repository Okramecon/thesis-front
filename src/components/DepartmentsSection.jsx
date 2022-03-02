import React from 'react';
import DepartmentCard from './DepartmentCard';

const DepartmentsSection = ({departments, title}) => {

    if (!departments.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Departments not founded!
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
                    {departments.map((department) =>
                        <DepartmentCard key={department.id} id={department.id} title={department.title} summary={department.summary}/>)}
                </div>
            </div>
        </div>
    );
};


export default DepartmentsSection;