import React from 'react';
import DepartmentCard from './DepartmentCard';
import CreateDepartmentModal from './CreateDepartmentModal';

const DepartmentsSection = ({isDepartmentLoading, departments, title, fetchDepartments}) => {

  if (isDepartmentLoading)
    return(<div></div>);

  if (!departments.length) {
    return (
      <h1 style={{textAlign: 'center'}}>
          Departments not found!
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
          {
            departments.map((department) =>
              <DepartmentCard key={department.id} id={department.id} title={department.title} summary={department.summary}/>)
          }
          <CreateDepartmentModal fetchDepartments={fetchDepartments}/>
        </div>
      </div>
    </div>
  );
};


export default DepartmentsSection;