import React from 'react';
import Star from './Star';

// style
import './index.scss';

function Comment() {
  return (
    <div className="comment">
      <div className="comment__username">
        <div
          className="comment__username__portrait"
        >
          <img
            src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
            alt="test"
          />
        </div>
        <div className="comment__username__name">
          Doggie
        </div>
      </div>
      <div className="comment__detail">
        <div className="comment__detail__star">
          <Star />
        </div>
        <div className="comment__detail__time">
          <p>10個月前</p>
        </div>

      </div>
      <div className="comment__detail__content">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore rem fugit deleniti temp
          oribus ullam, laborum qui iusto reicien
          dis, debitis libero ut aperiam, quam amet explicabo officiis sed quia a asperiores.

        </p>
      </div>
    </div>
  );
}

export default Comment;
