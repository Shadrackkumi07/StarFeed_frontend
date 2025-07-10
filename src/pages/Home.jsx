// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import StoryList   from '../components/StoryList';
import api         from '../api';
import '../styles/Home.css';

export default function Home() {
  const { currentUser, logout } = useAuth();

  const [stories, setStories]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch top stories
  async function fetchTopStories() {
    setLoading(true);
    setError('');
    try {
      const resp = await api.get('/topstories?limit=20');
      setStories(resp.data);
      setSearchMode(false);
    } catch {
      setError('Could not load top stories.');
    } finally {
      setLoading(false);
    }
  }

  // Search stories
  async function handleSearch(q) {
    if (!q.trim()) return;
    setLoading(true);
    setError('');
    try {
      const resp = await api.get('/search', { params: { q, limit: 10 } });
      setStories(resp.data);
      setSearchMode(true);
    } catch {
      setError('Search failed.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTopStories();
  }, []);

  return (
    <>
      <header className="app-header">
        <div className="app-logo">StarFeed</div>

        <div className="search-container">
          <form
            className="input-container"
            onSubmit={e => {
              e.preventDefault();
              handleSearch(searchTerm);
            }}
          >
            <input
              type="text"
              className="input"
              placeholder="search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <span
              className="icon"
              onClick={() => handleSearch(searchTerm)}
            >
              <svg
                width="19px"
                height="19px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="1"
                  d="M14 5H20"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="1"
                  d="M14 8H17"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                  stroke="#000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="1"
                  d="M22 22L20 20"
                  stroke="#000"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </form>
        </div>

        <div className="app-user">
          <span className="app-user__email">{currentUser.email}</span>
          <button onClick={logout} className="app-user__logout">
            Logout
          </button>
        </div>
      </header>

      <main className="app-main">
        {searchMode && (
          <button
  onClick={fetchTopStories}
  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
>
  <span className="text-xl">←</span>
  Back to Top Stories
</button>

        )}
        <h2 className="app-title">
          {searchMode ? 'Search Results' : 'Top Stories'}
        </h2>
        <StoryList
          stories={stories}
          loading={loading}
          error={error}
        />
      </main>
    </>
  );
}
