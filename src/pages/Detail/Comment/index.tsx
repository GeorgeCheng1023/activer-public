import React, { useRef } from 'react';
import Button from 'components/Button';
import {
  useSubmit, useNavigate, useFetcher, useParams,
  ActionFunction,
} from 'react-router-dom';
import { deleteComment, postComment } from 'api/user';
import getCookie from 'utils/getCookies';
import ReactStars from 'react-stars';

import './index.scss';

export const action: ActionFunction = async ({ request, params }) => {
  switch (request.method) {
    case 'DELETE': {
      const { id } = params;
      if (!id) {
        throw new Response('請提供活動ID!', { status: 400 });
      }
      await deleteComment(id, getCookie('sessionToken'));
      return null;
    }
    default: {
      const { id } = params;
      const formData = await request.formData();
      const comment = formData.get('comment') as string | null;
      const star = formData.get('star') as string;
      if (!comment && star === '0') {
        throw new Response('請撰寫評論內容!', { status: 400 });
      }
      if (!id) {
        throw new Response('請提供活動ID!', { status: 400 });
      }
      const res = await postComment(
        Number(id),
        comment,
        Number(star),
        getCookie('sessionToken'),
      );
      return res.data;
    }
  }
};

function CommentPanel() {
  const starRef = useRef(0);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const submit = useSubmit();
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const { id } = useParams();

  // handle submit comment
  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.set('comment', contentRef.current?.value || '');
    formData.set('star', starRef.current.toString());
    submit(formData, {
      method: 'post',
    });
  };

  const handleChangeRating = (newRating: number) => {
    starRef.current = newRating;
  };

  return (
    <div
      className="comment-panel"
      aria-hidden
      data-type="backdrop"
      onClick={(event) => {
        if ((event.target as HTMLElement).getAttribute('data-type') === 'backdrop') {
          navigate(`/detail/${id}`);
        }
      }}
    >
      <fetcher.Form
        onSubmit={handleSubmit}
        action="new"
        method="post"
        className="comment-panel__container"
      >
        <h2>撰寫評論 </h2>
        <ReactStars
          onChange={handleChangeRating}
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
          <Button text="張貼" type="submit" />
          <Button
            onClick={() => navigate(`/detail/${id}`)}
            text="取消"
            type="button"
            variant={{ outline: true }}
          />
        </div>
      </fetcher.Form>
    </div>
  );
}

export default CommentPanel;
