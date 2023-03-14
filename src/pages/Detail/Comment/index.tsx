import React, { useEffect, useRef } from 'react';
import Button from 'components/Button';
import {
  useSubmit, useNavigate, useFetcher, useParams,
  ActionFunction,
  useRouteLoaderData,

} from 'react-router-dom';
import { deleteComment, postComment } from 'api/user';
import getCookie from 'utils/getCookies';
import ReactStars from 'react-stars';

import './index.scss';
import { DetailLoaderType } from 'types/Loader';
import Popup from 'components/Popup';

export const deleteCommentAction: ActionFunction = async ({ params }) => {
  const { commentId, activityId } = params;
  if (!commentId) {
    throw new Response('請提供活動ID!', { status: 400 });
  }
  await deleteComment(commentId as string, getCookie('sessionToken'));
  return new Response('', {
    status: 302,
    headers: {
      Location: `/detail/${activityId}`,
    },
  });
};

export const addCommentAction: ActionFunction = async ({ request, params }) => {
  const { activityId } = params;
  const formData = await request.formData();
  const comment = formData.get('comment') as string | null;
  const star = formData.get('star') as string;
  if (!comment && star === '0') {
    throw new Response('請撰寫評論內容!', { status: 400 });
  }
  if (!activityId) {
    throw new Response('請提供活動ID!', { status: 400 });
  }
  await postComment(
    Number(activityId),
    comment,
    Number(star),
    getCookie('sessionToken'),
  );
  return new Response('', {
    status: 302,
    headers: {
      Location: `/detail/${activityId}`,
    },
  });
};

function Comment() {
  const starRef = useRef(0);
  const submit = useSubmit();
  const detailLoaderData = useRouteLoaderData('detail') as DetailLoaderType;
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const { activityId } = useParams();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.value = detailLoaderData.userCommentData?.content || '';
    }
  }, []);

  // handle submit comment
  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.set('comment', contentRef.current?.value || '');
    formData.set('star', starRef.current.toString());
    submit(formData, {
      method: 'post',
      action: `/detail/${activityId}/comment/new`,
    });
  };

  const handleChangeRating = (newRating: number) => {
    starRef.current = newRating;
  };

  return (
    <Popup
      backLink={`/detail/${activityId}`}
      className="comment-panel"
    >
      <fetcher.Form
        onSubmit={handleSubmit}
        action="new"
        method="post"
        className="comment-panel__inner"
      >
        <h2>撰寫評論 </h2>
        <ReactStars
          onChange={handleChangeRating}
          edit
          size={35}
          value={detailLoaderData.userCommentData
            ? detailLoaderData.userCommentData.star
            : 0}
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
            onClick={() => navigate(`/detail/${activityId}`)}
            text="取消"
            type="button"
            variant={{ outline: true }}
          />
        </div>
      </fetcher.Form>
    </Popup>
  );
}

export default Comment;
