import React from 'react';
import { CommentResultDataType } from 'types/ActivityDataType';
import { formateDateSimple } from 'utils/convertDate';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import Button from 'components/Button';
import { TEST_URL } from 'api/user';
import {
  Form, useNavigate,
} from 'react-router-dom';
import ReactStars from 'react-stars';
import './index.scss';

interface CommentType {
  comment: CommentResultDataType;
  controllable?: boolean;
}

function CommentItem({ comment, controllable }: CommentType) {
  const navigate = useNavigate();

  const {
    id, star, createdAt, content, username, userAvatar,
  } = comment;
  return (
    <div className="comment-item">
      <div className="comment-item__header">
        <div
          className="comment-item__user"
        >
          <img
            className="comment-item__portrait"
            src={userAvatar ? `${TEST_URL}${userAvatar}` : '/public/user.png'}
            alt={username}
          />

          <div className="comment-item__title">
            <span className="comment-item__name">
              {username}
            </span>
            <div className="comment-item__description">
              <div className="comment-item__description__star">
                <ReactStars edit={false} value={star} />
              </div>
              <span className="comment-item__description__time">
                {formateDateSimple(createdAt)}
              </span>
            </div>
          </div>

        </div>
        {controllable && (

          <div className="comment-item__control">
            {/* Delete Button */}
            <Form
              method="delete"
              action={`comment/delete/${id}`}
              onSubmit={(event) => {
                if (
                  // eslint-disable-next-line
                  !confirm(
                    '確認刪除?',
                  )
                  // TODO: custom confirm
                ) {
                  event.preventDefault();
                }
              }}
            >
              <Button
                color="white"
                variant={{ round: true }}
                iconBefore={<RiDeleteBin6Line />}
              />
            </Form>

            {/* Edit Button */}

            <Button
              color="white"
              variant={{ round: true }}
              iconBefore={<AiOutlineEdit />}
              type="button"
              onClick={() => navigate('comment')}
            />

          </div>
        )}
      </div>

      <p className="comment-item__content">
        {content}
      </p>
    </div>
  );
}

export default CommentItem;
