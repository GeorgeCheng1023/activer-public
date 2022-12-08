import React, { useState } from 'react';
import Button from 'components/Button';
import { FaEdit } from 'react-icons/fa';
import Comment from '../Comment';
import CommentPanel from '../CommentPanel';

function DetailComment() {
  // display comment push panel
  const [displayCommentPanel, setDisplayCommentPanel] = useState(false);
  const handleOpenCommentPanel = (e: any) => {
    e.preventDefault();
    setDisplayCommentPanel(true);
  };

  const handleSubmitComment = (starValue: number, contentValue: string) => {
    console.log(starValue, contentValue);
  };

  return (
    <>
      <div className="detail__comment__title">
        <h2 className="detail__h2">活動評論</h2>
        <Button
          text="撰寫評論"
          iconBefore={<FaEdit />}
          size="sm"
          onClick={handleOpenCommentPanel}
        />

      </div>
      <Comment />
      {displayCommentPanel
          && (
            <CommentPanel
              setDisplay={setDisplayCommentPanel}
              display={displayCommentPanel}
              onSubmit={handleSubmitComment}
            />
          )}
    </>
  );
}

export default DetailComment;
