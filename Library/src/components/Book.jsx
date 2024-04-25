import React from 'react';

const Book = ({ title, author, description }) => {
  return (
    <div className="book">
      <h2>{title}</h2>
      <h3>{author}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Book;