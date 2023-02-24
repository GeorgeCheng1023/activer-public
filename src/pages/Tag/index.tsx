import React from 'react';
import { getAllTags } from 'api/tag';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import DetailTag from 'components/Tag/DetailTag';
import './index.scss';
import { tagsLoaderType } from 'types/Loader';

export const loader: LoaderFunction = async () => {
  const res = await getAllTags();
  const locationTags = res.data.filter((tag) => tag.type === 'location');
  const areaTags = res.data.filter((tag) => tag.type === 'area');
  const otherTags = res.data.filter((tag) => tag.type === 'other');

  return {
    locationTags,
    areaTags,
    otherTags,
  };
};

function TagPage() {
  const loaderData = useLoaderData() as tagsLoaderType;
  return (
    <div className="tag-page">
      <h1>所有標籤</h1>
      <h2>地區標籤</h2>
      <div className="tag-page__tags tag-page__location ">
        {loaderData.locationTags.map((tag) => (
          <DetailTag
            id={`tag-${tag.id}`}
            text={tag.text}
            activityAmount={tag.activityAmount}
            tagTrend={tag.tagTrend}
            type={tag.type}
          />
        )) }
      </div>
      <h2>領域標籤</h2>
      <div className="tag-page__tags tag-page__area">
        {loaderData.areaTags.map((tag) => (
          <DetailTag
            id={`tag-${tag.id}`}
            text={tag.text}
            activityAmount={tag.activityAmount}
            tagTrend={tag.tagTrend}
            type={tag.type}
          />
        )) }
      </div>
      <h2>其他標籤</h2>
      <div className="tag-page__tags tag-page__area">
        {loaderData.otherTags.map((tag) => (
          <DetailTag
            id={`tag-${tag.id}`}
            text={tag.text}
            activityAmount={tag.activityAmount}
            tagTrend={tag.tagTrend}
            type={tag.type}
          />
        )) }
      </div>
    </div>
  );
}

export default TagPage;
