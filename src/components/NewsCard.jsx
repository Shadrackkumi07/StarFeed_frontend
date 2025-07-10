// src/components/NewsCard.jsx
import React from 'react';
import Rating from './Rating';
import Comments from './Comments';
import '../styles/NewsCard.css';

export default function NewsCard({ story }) {
  return (
    <div className="news-card">
      <div className="news-card__preview">
        
   <img
     src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(story.url)}?w=800`}
     alt={story.title}
     onError={e => {
       e.target.onerror = null;
       // fallback to this placeholder if the screenshot fails
       e.target.src = '/placeholder.jpg';
     }}
   />
 </div>
      <div className="news-card__content">
        <a
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-card__title"
        >
          {story.title}
        </a>
        <p className="news-card__meta">
          by {story.by} — {story.score} points
        </p>
        {/* Rating UI */}
        <Rating itemId={String(story.id)} />
        {/* Comments UI */}
        <Comments itemId={String(story.id)} />
      </div>
    </div>
  );
}
