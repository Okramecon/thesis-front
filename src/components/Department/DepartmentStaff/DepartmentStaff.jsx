import React from 'react';
import PropTypes from 'prop-types';
import UserToDepartmentForm from "../../Admin/UserToDepartmentForm";

const DepartmentStaff = props => {

  const roles = localStorage.getItem('roles');
  const isDepartmentAdmin = roles.includes('Admin') || roles.includes('DepartmentAdmin')

  return (
      <>
        {isDepartmentAdmin && <UserToDepartmentForm departmentId={props.departmentId}/>}
      </>
  );
};

DepartmentStaff.propTypes = {
  departmentId: PropTypes.number
};

export default DepartmentStaff;