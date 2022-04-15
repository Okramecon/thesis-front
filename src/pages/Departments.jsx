import React, { useEffect, useState } from 'react';
import ThesisAPIService from '../API/ThesisAPI';
import DepartmentsSection from '../components/DepartmentsSection';

const Departments = () => {
  const [departments, setDepartmnets] = useState([]);

  const fetchDepartments = () => {
    ThesisAPIService.getAllDepartments()
    .then(response => {
      setDepartmnets(response.data);
    })
  }
  
  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className='submain'>
      <DepartmentsSection isDepartmentLoading={false} departments={departments} title="Departments" fetchDepartments={fetchDepartments}/>
    </div>
  );
};

export default Departments;