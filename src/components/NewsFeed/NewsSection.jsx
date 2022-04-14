import ThesisAPIService from 'API/ThesisAPI';
import { AppContext } from 'App';
import AlertSeverities from 'helpers/AlertSeverities';
import React, { useContext, useEffect, useState } from 'react'
import CreateNewsModal from './CreateNewsModal';
import NewsCard from './NewsCard';

function NewsSection({ departmentId }) {
  //to do add paging
  const setAlertState = useContext(AppContext)
  const [news, setNews] = useState([])

  const fetchNews = () => {
    ThesisAPIService
    .getNewsByDepartmentId(departmentId)
    .then(response => {
      if(response.ok) {
        //to do, add only new news
        setNews(response.data)
      } else {
        setAlertState({ message: response.message, duration: 8000, severity: AlertSeverities.error })
      }
    })
  }

  useEffect(() => {
    fetchNews()
  },[])

  return (
    <React.Fragment>
      {
        news.map(item => 
          <NewsCard key={item.id} item={item}/>
        )
      }    
      <CreateNewsModal fetchNews={fetchNews}/>
    </React.Fragment>
  )
}

export default NewsSection