import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserToDepartmentForm from "../../Admin/UserToDepartmentForm";
import DepartmentUsersList from 'components/Admin/DepartmentUsersList';
import { Divider } from '@mui/material';
import ThesisAPIService from 'API/ThesisAPI';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentStaff = props => {

  const roles = localStorage.getItem('roles');
  const isDepartmentAdmin = roles.includes('Admin') || roles.includes('DepartmentAdmin')

  const [users, setUsers] = useState([])
  const { departmentId } = useParams()

  const navigate = useNavigate()
  const fetchUsers = () => {
    ThesisAPIService.getUsersByDepartment(departmentId)
    .then(response => {
      if(response.ok) {
        setUsers(response.data)
      } else {
        navigate('/departments')
      }
    })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
      <>
        {isDepartmentAdmin && <UserToDepartmentForm departmentId={props.departmentId} fetchUsers={fetchUsers}/>}
        <Divider sx={{mt: '10px', mb: '10px'}}/>
        {isDepartmentAdmin && <DepartmentUsersList users={users} fetchUsers={fetchUsers} departmentId={departmentId}/>}
      </>
  );
};

DepartmentStaff.propTypes = {
  departmentId: PropTypes.number
};

export default DepartmentStaff;