import React, { useRef } from 'react';
// components
import Button from 'components/Button';
import Popup, { PopupDisplayType } from 'components/Popup';
import Star from '../Comment/Star';

// style
import './index.scss';

interface Props extends PopupDisplayType {
  onSubmit: (starValue: number, content: string) => void;
}

function CommentPanel({ onClose, display, onSubmit }: Props) {
  const starRef = useRef(0);
  const contentRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  // handle submit comment
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(starRef.current, contentRef.current.value);
    onClose();
  };

  // handle cancel write comment
  const handelCancel = (e: any) => {
    e.preventDefault();
    onClose();
  };

  const handleChangeRating = (newRating: number) => {
    starRef.current = newRating;
  };

  return (
    <Popup display={display} onClose={onClose}>

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
          <Button onClick={handelCancel} text="取消" variant={{ outline: true }} />
        </div>
      </div>
    </Popup>
  );
}

export default CommentPanel;
