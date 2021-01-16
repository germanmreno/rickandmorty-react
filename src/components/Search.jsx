import React from 'react';

export const Search = ({ search, searchInput, handleSearch }) => {
  return (
    <div className="Search">
      <h2 className="title">Search character</h2>
      <input
        className="search-character"
        type="text"
        onChange={handleSearch}
        value={search}
        ref={searchInput}
        placeholder="Search characters..."
      />
    </div>
  );
};
