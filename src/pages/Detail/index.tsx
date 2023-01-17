import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// api
import { getActivityById } from 'api/activity';
// type
import ActivityDataType, { BranchDataType } from 'types/ActivityDataType';

// components
import ManageNav from 'components/ManageNav';

import {
  DetailImage,
  DetailTags,
  DetailProperties,
  LinkWrapper,
} from './components';

// style
import './index.scss';
// initial state
import { initialDataState, initialBranchesState } from './utils/initialData';

function Detail() {
  const { id } = useParams();

  // init state
  const [data, setData] = useState<ActivityDataType>(initialDataState);
  const [currentBranch, setCurrentBranch] = useState<BranchDataType>(initialBranchesState);

  // handle click branch name event
  const handleChangeFilter = (selectedId : string) => {
    setCurrentBranch(data.branches.find((branch) => branch.id.toString() === selectedId)!);
  };

  // get data
  useEffect(() => {
    const dataFetch = async () => {
      try {
        if (!id) throw new Error('No id provided');
        const res = await getActivityById(id.toString());
        setData(res.data);
        setCurrentBranch(res.data.Branches[0]);
      } catch (err) {
        console.error(err);
      }
    };
    dataFetch();
  }, []);

  // destructing data
  const {
    id: activityId,
    images, title, subTitle, tags, holder, objective, content, sources, branches, connection,
  } = data;

  return (
    <div className="detail">

      {/* Introduction */}
      <div className="detail__container--intro">

        <div className="detail__container--card">
          {/* Image */}
          <DetailImage
            activityId={activityId}
            images={images}
            altText={title}
          />
          {/* Title */}
          <h2>{title}</h2>

          {/* SubTitle */}
          {subTitle && (
            <h3>{subTitle}</h3>
          )}
          {/* Tags */}
          <DetailTags tags={tags} />
        </div>

        <div className="detail__container--properties">
          {/* Branch Navigation */}
          <ManageNav
            filters={
              branches.map((branch: BranchDataType) => ({
                id: branch.id.toString(),
                label: branch.branchName,
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
      </div>

      {/* main content */}
      <div className="detail__content">

        {/* Object */}
        <div className="detail__objective">
          <h2>活動對象</h2>
          <p>{objective}</p>
        </div>
        <br />

        {/* Content */}
        <div className="detail__content">
          <h2>活動內容</h2>
          <LinkWrapper text={content} />
        </div>

        {/* Sources */}
        {sources && (
          <div className="detail__source">
            <h2>原始來源</h2>
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
        {connection && (
          <div className="detail__connection">
            <h2>聯絡資訊</h2>
            {connection.map((item: string, index: number) => (
              <p key={`detail-connection-${index}`}>
                {item}
              </p>
            ))}
          </div>

        )}

        {/* Holder */}
        {holder && (
          <div>
            <h2>主辦單位</h2>
            {holder.map((item: string, index:number) => (
              <p key={`detail-holder-${index}`}>
                {item}
              </p>
            ))}
          </div>
        )}

        {/* <DetailComment /> */}
      </div>
    </div>
  );
}

export default Detail;
