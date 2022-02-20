import React from 'react';
import PropTypes from 'prop-types';
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
            <div className='grid'>
                {departments.map((department, index) =>
                        <DepartmentCard key={department.id} />)}
            </div>
        </div>
    );
};


export default DepartmentsSection;