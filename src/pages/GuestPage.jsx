import NewsFeed from 'components/NewsFeed/NewsFeed'
import React from 'react'

export default function GuestPage() {

    const news = [
        {
            title: "Some title",
            summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit." &
            "Laboriosam inventore accusantium cupiditate exercitationem pariatur, " &
            "molestiae excepturi dicta hic velit assumenda architecto voluptatum odio quibusdam tempora" &
            "eligendi suscipit nostrum accusamus veritatis}"
        },
        {
            title: "Some title",
            summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit." &
            "Laboriosam inventore accusantium cupiditate exercitationem pariatur, " &
            "molestiae excepturi dicta hic velit assumenda architecto voluptatum odio quibusdam tempora" &
            "eligendi suscipit nostrum accusamus veritatis}"
        },
        {
            title: "Some title",
            summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit." &
            "Laboriosam inventore accusantium cupiditate exercitationem pariatur, " &
            "molestiae excepturi dicta hic velit assumenda architecto voluptatum odio quibusdam tempora" &
            "eligendi suscipit nostrum accusamus veritatis}"
        },
        {
            title: "Some title",
            summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit." &
            "Laboriosam inventore accusantium cupiditate exercitationem pariatur, " &
            "molestiae excepturi dicta hic velit assumenda architecto voluptatum odio quibusdam tempora" &
            "eligendi suscipit nostrum accusamus veritatis}"
        },
        {
            title: "Some title",
            summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit." &
            "Laboriosam inventore accusantium cupiditate exercitationem pariatur, " &
            "molestiae excepturi dicta hic velit assumenda architecto voluptatum odio quibusdam tempora" &
            "eligendi suscipit nostrum accusamus veritatis}"
        }
    ]

    return (
        <div>
            <NewsFeed news={news}/>
        </div>
    )
}
