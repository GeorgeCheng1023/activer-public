import React from 'react';
import Star from './Star';

function Comment() {
  const arr = [0, 1, 2, 3, 4];
  return (
    <>
      {arr.map(() => <Star />)}
    </>
  );
}

export default Comment;
