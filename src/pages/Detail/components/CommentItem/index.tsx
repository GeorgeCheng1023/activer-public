import React from 'react';
import { CommentResultDataType } from 'types/ActivityDataType';
import { formateDateSimple } from 'utils/convertDate';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import Button from 'components/Button';
import { useAppSelector } from 'hooks/redux';
import { getUserId } from 'store/userAuth';
import { Form } from 'react-router-dom';
import ReactStars from 'react-stars';
import './index.scss';

interface CommentType {
  comment: CommentResultDataType;
}

function CommentItem({ comment }: CommentType) {
  const selectUserId = useAppSelector(getUserId);
  const {
    id, star, createdAt, content, userId, username, userAvatar,
  } = comment;
  return (
    <div className="comment-item">
      <div className="comment-item__header">
        <div
          className="comment-item__user"
        >
          <img
            className="comment-item__portrait"
            src={userAvatar}
            alt="test"
          />

          <div className="comment-item__title">
            <span className="comment-item__name">
              {username}
            </span>
            <div className="comment-item__description">
              <div className="comment-item__description__star">
                <ReactStars edit={false} value={star / 10} />
              </div>
              <span className="comment-item__description__time">
                {formateDateSimple(createdAt)}
              </span>
            </div>
          </div>

        </div>
        {userId === selectUserId
          && (
            <div className="comment-item__control">
              <Form method="delete" action={`/detail/${id}/comment`}>
                <Button
                  color="white"
                  variant={{ round: true }}
                  iconBefore={<RiDeleteBin6Line />}
                />
              </Form>
              <Button
                color="white"
                variant={{ round: true }}
                iconBefore={<AiOutlineEdit />}
              />
            </div>
          ) }
      </div>

      <p className="comment-item__content">
        {content}
      </p>
    </div>
  );
}

export default CommentItem;
