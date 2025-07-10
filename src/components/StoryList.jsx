// src/components/StoryList.jsx
import React from 'react';
import NewsCard from './NewsCard';

export default function StoryList({ stories, loading, error }) {
  if (loading) return <p>Loading…</p>;
  if (error)   return <p className="text-red-600">{error}</p>;
  if (!stories.length) return <p>No results.</p>;

  return (
    <div>
      {stories.map(story => (
        <NewsCard key={story.id} story={story} />
      ))}
    </div>
  );
}
