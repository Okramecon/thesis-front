import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserToDepartmentForm from "../../Admin/UserToDepartmentForm";
import DepartmentUsersList from 'components/Admin/DepartmentUsersList';
import { Divider } from '@mui/material';
import ThesisAPIService from 'API/ThesisAPI';
import { useParams } from 'react-router-dom';

const DepartmentStaff = props => {

  const roles = localStorage.getItem('roles');
  const isDepartmentAdmin = roles.includes('Admin') || roles.includes('DepartmentAdmin')

  const [users, setUsers] = useState([])
  const { departmentId } = useParams()
  const fetchUsers = () => {
    ThesisAPIService.getUsersByDepartment(departmentId)
    .then(items => {
      setUsers(items.data)
    })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
      <>
        {isDepartmentAdmin && <UserToDepartmentForm departmentId={props.departmentId} fetchUsers={fetchUsers}/>}
        <Divider sx={{mt: '10px', mb: '10px'}}/>
        {isDepartmentAdmin && <DepartmentUsersList users={users}/>}
      </>
  );
};

DepartmentStaff.propTypes = {
  departmentId: PropTypes.number
};

export default DepartmentStaff;