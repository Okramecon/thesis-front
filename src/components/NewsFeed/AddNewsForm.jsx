import { Box, Button, Stack, TextField } from '@mui/material';
import ThesisAPIService from 'API/ThesisAPI';
import { AppContext } from 'App';
import AlertSeverities from 'helpers/AlertSeverities';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

const AddNewsForm = ({closeModal, fetchNews }) => {
    const setAlertState = useContext(AppContext)
    const { departmentId } = useParams()
    const [news, setNews] = useState({title : "", body: "", departmentId: departmentId})

    const postNews = () => {
      ThesisAPIService.postNews(news)
      .then(response => {
        if(response.ok) {
          setAlertState({alertOpen: true, message: response.message, severity: AlertSeverities.success})
          fetchNews();
          closeModal()
        } else {
          setAlertState({alertOpen: true, message: response.message, severity: AlertSeverities.error})
        }
      })
    }

    const _handleTitleTextFieldChange = function(e) {
        setNews({...news, title:e.target.value})
    }
    const _handleBodyTextFieldChange = function(e) {
        setNews({...news, body:e.target.value})
    }

    return (
      <Stack spacing={2}>  
          <TextField
              required
              id="1"
              label="Name"
              value={news.title}
              onChange={_handleTitleTextFieldChange}
          />
          <TextField
              id="2"
              label="Body"
              multiline
              rows={4}
              value={news.summary}
              onChange={_handleBodyTextFieldChange}
          />
          <Button variant="contained" onClick={postNews}>Add</Button>
      </Stack>
    );
};

export default AddNewsForm;