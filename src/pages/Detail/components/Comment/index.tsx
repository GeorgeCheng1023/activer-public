import React from 'react';
import { CommentResultDataType } from 'types/ActivityDataType';
import { formateDateSimple } from 'utils/convertDate';
import Star from './Star';
import './index.scss';

interface CommentType {
  comment: CommentResultDataType;
}

function Comment({ comment }: CommentType) {
  const { star, createdAt, content } = comment;
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
          <Star value={star} />
        </div>
        <div className="comment__detail__time">
          <p>{formateDateSimple(createdAt)}</p>
        </div>

      </div>
      <div className="comment__detail__content">
        <p>
          {content}
        </p>
      </div>
    </div>
  );
}

export default Comment;
