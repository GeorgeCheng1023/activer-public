import { Buffer } from 'buffer';
import React, { useState } from 'react';
import {
  LoaderFunction, useLoaderData, useNavigate, ActionFunction,
  Outlet,
  Link,
} from 'react-router-dom';
import { getActivityById, postActivityStatus } from 'api/activity';
import { ActivityTagDataType, BranchDataType } from 'types/ActivityDataType';
import Button from 'components/Button';
import ManageNav from 'components/ManageNav';
import Tag, { TagType } from 'components/Tag';
import Loading from 'pages/Loading';
import { BsPlus } from 'react-icons/bs';
import {
  FcGraduationCap, FcList, FcPhone, FcReading, FcShare,
} from 'react-icons/fc';
import getCookie from 'utils/getCookies';
import { getComment } from 'api/user';
import { DetailLoaderType } from 'types/Loader';
import CommentItem from './components/CommentItem';

import {
  DetailImage,
  DetailProperties,
} from './components';

import './index.scss';

export const loader: LoaderFunction = async ({ params }) :
Promise<DetailLoaderType> => {
  const { activityId } = params;

  // if not given id, throw error
  if (!activityId) {
    throw new Response('請提供活動ID!', { status: 404 });
  }

  // GET: activity data
  const activityRes = await getActivityById(
    activityId.toString(),
    getCookie('sessionToken'),
  );

  // GET: comment data
  const commentRes = await getComment(
    20,
    1,
    Number(activityId),
    getCookie('sessionToken'),
  );

  return {
    activityData: activityRes.data,
    commentData: commentRes.data,
    userCommentData: commentRes.data.userComment,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const res = await postActivityStatus(
    formData.get('activityId') as string,
    formData.get('branchId') as string,
    formData.get('status') as string,
    formData.get('sessionToken') as string,
  );
  return res.data;
};

function Detail() {
  const loaderData = useLoaderData() as DetailLoaderType;
  const [currentBranch, setCurrentBranch] = useState<BranchDataType>(
    loaderData.activityData.branches[0],
  );
  const navigate = useNavigate();

  // handle click branch name event
  const handleChangeFilter = (selectedId : string) => {
    setCurrentBranch(
      loaderData.activityData.branches?.find((branch: BranchDataType) => (
        branch.id.toString() === selectedId))!,
    );
  };

  // destructing data
  const {
    id: activityId,
    title, subTitle, tags, holder, objective, images, content, sources, branches, connection,
  } = loaderData.activityData;

  if (!loaderData) {
    return <Loading />;
  }

  return (
    <div className="detail" id="detail">

      {/* Introduction */}
      <div className="detail__hero">

        <div className="detail__hero__left">
          <Button
            onClick={() => navigate(-1)}
            color="white"
            variant={{ underline: true }}
            text="返回上一頁"
            className="detail__hero__left__back"
          />

          {/* Image */}
          <DetailImage
            images={images}
            altText={title}
          />

          {/* Title */}
          <h2 className="detail__header">{title}</h2>

          {/* SubTitle */}
          {subTitle && (
            <h3>{subTitle}</h3>
          )}
          {/* Tags */}
          {tags && (
            <div className="detail__tags">
              {tags.map((tag: ActivityTagDataType) => {
                const variant = tag.type as TagType['type'];
                return (
                  <Tag
                    id={`detail-tag-${tag.id!.toString()}`}
                    key={`detail-tag-${tag.id!.toString()}`}
                    text={tag.text}
                    type={variant}
                  />
                );
              }).slice(0, 5)}
            </div>
          )}

          {/* Add Tag Button */}
          <Button
            className="detail__add-tag"
            text="新增標籤"
            onClick={() => navigate(`/detail/${activityId}/vote`, {
              replace: true,
            })}
            color="dark"
            iconAfter={<BsPlus />}
          />

        </div>

        <div className="detail__hero__right">
          {branches && (
            <>
              {/* Branch Navigation */}
              <ManageNav
                filters={
                  branches.map((branch: BranchDataType) => ({
                    id: branch.id.toString(),
                    label: branch.branchName || '',
                  }))
                }
                onChangeFilter={handleChangeFilter}
                currentFilterId={currentBranch.id.toString()}
              />

              {/* Branch Detail Properties */}
              <DetailProperties
                branch={currentBranch}
                activityId={activityId.toString()}
              />
            </>
          )}
        </div>
      </div>

      {/* main content */}
      <div className="detail__main">

        {/* Object */}
        {objective
          && (
            <div className="detail__objective">
              <h2 className="detail__header">
                <FcReading />
                活動對象
              </h2>
              <p>{objective}</p>
            </div>
          ) }

        {/* Content */}
        <div className="detail__content">
          <h2 className="detail__header">
            <FcList />
            活動內容
          </h2>
          <div
            className="detail__content__main"
            dangerouslySetInnerHTML={{ __html: Buffer.from(content, 'base64').toString('utf-8') }}
          />
        </div>

        {/* Sources */}
        {sources && sources.length !== 0 && (
          <div className="detail__source">
            <h2 className="detail__header">
              <FcShare />
              原始來源
            </h2>
            {sources.map((source: string, index: number) => (
              <a
                href={source}
                target="_blank"
                className="detail__a"
                key={`detail__source-${index}`}
                rel="noreferrer"
              >
                {source}
              </a>
            ))}
          </div>
        )}

        {/* Connection */}
        {connection && connection.length !== 0 && (
          <div className="detail__connection">
            <h2 className="detail__header">
              <FcPhone />
              聯絡資訊
            </h2>
            {connection.map((item: string, index: number) => (
              <p key={`detail-connection-${index}`}>
                {item}
              </p>
            ))}
          </div>
        )}

        {/* Holder */}
        {holder && holder.length !== 0 && (
          <div className="detail__holder">
            <h2 className="detail__header">
              <FcGraduationCap />
              主辦單位
            </h2>
            {holder.map((item: string, index:number) => (
              <p key={`detail-holder-${index}`}>
                {item}
              </p>
            ))}
          </div>
        )}

        {/* Comment */}
        <div className="detail__comment">
          <h2 className="detail__header">
            <FcGraduationCap />
            評論
            {!loaderData.userCommentData
            && (
              <Link to={`/detail/${activityId}/comment`}>
                <Button
                  className="detail__comment__add"
                  type="button"
                  color="primary"
                  iconBefore={<BsPlus />}
                  text="建立"
                />
              </Link>
            )}
          </h2>
          {loaderData.userCommentData
            && (
              <CommentItem comment={loaderData.userCommentData} controllable />
            )}
          {loaderData.commentData.searchResultData.map((comment) => (
            <CommentItem
              comment={comment}
              key={`comment-${comment.id}`}
            />
          ))}
        </div>

        {/* Popup */}

        <Outlet />

      </div>
    </div>
  );
}

export default Detail;
