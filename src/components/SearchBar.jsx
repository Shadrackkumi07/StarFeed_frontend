// src/components/SearchBar.jsx
import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const q = term.trim();
    if (q) onSearch(q);
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-6">
      <input
        type="text"
        placeholder="Search HackerNews…"
        value={term}
        onChange={e => setTerm(e.target.value)}
        className="flex-grow p-2 border rounded-l focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 bg-blue-500 text-white font-semibold rounded-r hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}
