import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
// api
import { getActivityById } from 'api/activity';
import ActivityDataType, { ActivityTagDataType, BranchDataType } from 'types/ActivityDataType';
// components
import Button from 'components/Button';
import ManageNav from 'components/ManageNav';
import Tag, { TagType } from 'components/Tag';
import { throwError } from 'pages/Error';
import Loading from 'pages/Loading';
import { BsPlus } from 'react-icons/bs';
import {
  FcGraduationCap, FcList, FcPhone, FcReading, FcShare,
} from 'react-icons/fc';
import getCookie from 'utils/getCookies';
import {
  DetailImage,
  DetailProperties,
} from './components';
import VotePanel from './components/VotePanel';
import './index.scss';

export async function loader({ params }: any) {
  const { id } = params;
  if (!id) {
    throwError('請提供活動ID!', 404);
  }
  const res = await getActivityById(id.toString(), getCookie('sessionToken'));
  return res.data;
}

function Detail() {
  const [displayVotePanel, setDisplayVotePanel] = useState(false);
  const data = useLoaderData() as ActivityDataType;
  const [currentBranch, setCurrentBranch] = useState<BranchDataType>(data.branches[0]);
  const navigate = useNavigate();

  // handle click branch name event
  const handleChangeFilter = (selectedId : string) => {
    setCurrentBranch(data.branches?.find((branch) => branch.id.toString() === selectedId)!);
  };

  // show vote tag panel
  const handleShowVotePanel:
  React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setDisplayVotePanel(true);
  };

  // destructing data
  const {
    id: activityId,
    images, title, subTitle, tags, holder, objective, content, sources, branches, connection,
  } = data;

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="detail">

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
            text="新增標籤"
            onClick={handleShowVotePanel}
            color="dark"
            iconAfter={<BsPlus />}
          />

          {/* Tag Vote Panel */}
          <VotePanel
            display={displayVotePanel}
            onClose={() => setDisplayVotePanel(false)}
            tags={tags}
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

      </div>
    </div>
  );
}

export default Detail;
