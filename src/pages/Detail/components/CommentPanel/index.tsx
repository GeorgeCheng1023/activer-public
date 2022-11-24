import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
// components
import Button from 'components/Button';
import Star from '../Comment/Star';

// style
import './index.scss';

type Props = {
  setDisplayCommentPanel: React.Dispatch<React.SetStateAction<boolean>>
};

function CommentPanel({ setDisplayCommentPanel }: Props) {
  const starRef = useRef(0);
  const contentRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  // handle submit comment
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(`${starRef.current}, ${contentRef.current.value}`);
    setDisplayCommentPanel(false);
  };

  // handle cancel write comment
  const handelCancel = (e: any) => {
    e.preventDefault();
    setDisplayCommentPanel(false);
  };

  const handleChangeRating = (newRating: number) => {
    starRef.current = newRating;
  };

  return createPortal(
    <>
      <div className="comment-panel__back" />
      <div className="comment-panel">
        <h2>撰寫評論 </h2>
        <Star
          onChangeRating={handleChangeRating}
          edit
          size={35}
        />
        <textarea
          className="comment-panel__content"
          name="content"
          rows={4}
          placeholder="詳細寫出你在這個活動的體驗"
          ref={contentRef}
        />
        <div className="comment-panel__control">
          <Button onClick={handleSubmit} text="張貼" />
          <Button onClick={handelCancel} text="取消" variant="outline" />
        </div>
      </div>
    </>,
    document.getElementById('root')!,
  );
}

export default CommentPanel;
