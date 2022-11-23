import React, { useRef } from 'react';
import FormInput from 'components/Form/FormInput';
import Button from 'components/Button';
import Star from '../Comment/Star';

type CommentValuesType = {
  star: number,
  content: string,

};

type Props = {
  setDisplayCommentPanel: React.Dispatch<React.SetStateAction<boolean>>
};

function CommentPanel({ setDisplayCommentPanel }: Props) {
  const values = useRef<CommentValuesType>({
    star: 0,
    content: '',
  });

  // handle input change
  const handleChange = (key: any, value: any) => {
    values.current = {
      ...values.current,
      [key]: value,
    };
  };

  // handle submit comment
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(values);
    setDisplayCommentPanel(false);
  };

  // handle cancel write comment
  const handelCancel = (e: any) => {
    e.preventDefault();
    setDisplayCommentPanel(false);
  };

  const handleChangeRating = (newRating: number) => {
    handleChange('star', newRating);
  };

  return (
    <div className="comment-panel">
      <h2>撰寫評論 </h2>
      <Star onChangeRating={handleChangeRating} edit />
      <FormInput
        inputProps={{
          id: 'comment',
          name: 'comment',
          placeholder: '詳細說明你在這個活動的體驗',
          required: true,
        }}
        variant="withoutLabel"
        formValue={values.current}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit} text="張貼" />
      <Button onClick={handelCancel} text="取消" variant="outline" />
    </div>
  );
}

export default CommentPanel;
