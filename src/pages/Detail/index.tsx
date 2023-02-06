import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
// api
import { getActivityById } from 'api/activity';
import ActivityDataType, { ActivityTagDataType, BranchDataType } from 'types/ActivityDataType';
// components
import { BsPlus } from 'react-icons/bs';
import {
  FcReading, FcList, FcShare, FcPhone, FcGraduationCap,
} from 'react-icons/fc';
import Button from 'components/Button';
import ManageNav from 'components/ManageNav';
import Tag, { TagType } from 'components/Tag';
import Loading from 'pages/Loading';
import VotePanel from './components/VotePanel';
import {
  DetailImage,
  DetailProperties,
  LinkWrapper,
} from './components';

// style
import './index.scss';
// initial state
import { initialDataState, initialBranchesState } from './utils/initialData';

function Detail() {
  const { id } = useParams();
  const [cookies] = useCookies<string>(['user']);

  // init state
  const [data, setData] = useState<ActivityDataType>(initialDataState);
  const [currentBranch, setCurrentBranch] = useState<BranchDataType>(initialBranchesState);
  const [displayVotePanel, setDisplayVotePanel] = useState(false);

  // handle click branch name event
  const handleChangeFilter = (selectedId : string) => {
    setCurrentBranch(data.branches?.find((branch) => branch.id.toString() === selectedId)!);
  };

  // get data
  useEffect(() => {
    const dataFetch = async () => {
      try {
        if (!id) throw new Error('No id provided');
        const res = await getActivityById(id.toString(), cookies.sessionToken);
        setData(res.data);

        // if data branch existed, set branch to first one
        if (res.data.branches) {
          setCurrentBranch(res.data.branches[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    dataFetch();
  }, []);

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
      <div className="detail__container">
        {/* Introduction */}
        <div className="detail__hero">

          <div className="detail__hero__left">
            {/* Image */}
            <div className="detail__image">
              <DetailImage
                activityId={activityId}
                images={images}
                altText={title}
              />
            </div>
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

          {branches && (
            <div className="detail__hero__right">
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
            </div>
          )}
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
            <LinkWrapper text={content} />
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
    </div>
  );
}

export default Detail;
