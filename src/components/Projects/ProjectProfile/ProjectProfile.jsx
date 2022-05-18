import React from 'react';
import PropTypes from 'prop-types';
import {Divider, Typography} from "@mui/material";

const dividerStyle = {
  padding: '5px 0'
}

const textWrapStyle = {
  margin: '4px'
}

const ProjectProfile = props => {
  return (
      <>
        <Typography sx={textWrapStyle} variant='h4'>{props.project.title}</Typography>
        <Typography sx={textWrapStyle}>{props.project.summary}</Typography>
        <Divider sx={dividerStyle}/>
        <Typography sx={textWrapStyle} variant='h5'>Wiki</Typography>
      </>
  );
};

ProjectProfile.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string,
    summary: PropTypes.string,
    id: PropTypes.number
  })
};

export default ProjectProfile;