import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Box, Divider, Typography} from "@mui/material";
import UserToDepartmentForm from "../../Admin/UserToDepartmentForm";
import NewsFeed from "../../NewsFeed/NewsFeed";

const dividerStyle = {
  padding: '5px 0'
}

const textWrapStyle = {
  margin: '4px'
}

const DepartmentProfile = props => {

  return (
      <>
        <Typography sx={textWrapStyle} variant='h4'>{props.department.title}</Typography>
        <Typography sx={textWrapStyle}>{props.department.summary}</Typography>
        <Divider sx={dividerStyle}/>
        <NewsFeed departmentId={props.department.id}/>
      </>
  );
};

DepartmentProfile.propTypes = {
  department: PropTypes.shape({
    title: PropTypes.string,
    summary: PropTypes.string,
    id: PropTypes.number
  })
};

export default DepartmentProfile;