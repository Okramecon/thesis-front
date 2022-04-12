import ClickableCard from 'components/UI/ClickableCard/ClickableCard'
import React from 'react'
import cl from './NewsFeed.module.css'

export default function NewsFeed({news}) {

    const newsList = news.map(news => {
        return (
            <ClickableCard title={news.title} summary={news.summary}></ClickableCard>
        )
    })

  return (
    <div className={cl.feed}>
        {newsList}
    </div>
  )
}
