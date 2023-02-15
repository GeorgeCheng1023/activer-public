import React from 'react';
import { getAllTags } from 'api/tag';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { ActivityTagDataType } from 'types/ActivityDataType';
import Tag, { TagType } from 'components/Tag';

export const loader: LoaderFunction = async () => {
  const res = await getAllTags();
  return res.data;
};

function TagPage() {
  const loaderData = useLoaderData() as ActivityTagDataType[];
  return (
    <div className="tag-page">
      <h1>所有標籤</h1>
      {loaderData.map((tag) => (
        <Tag
          id={tag.id.toString()}
          text={tag.text}
          type={tag.type as TagType['type']}
        />
      )) }
    </div>
  );
}

export default TagPage;
