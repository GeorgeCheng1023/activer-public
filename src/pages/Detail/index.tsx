import React from 'react';

// components
import Card from 'components/Card';
import { TagType } from 'components/Tag';
import DetailProperties from './components/DetailProperties';
// data
import dummyActivityData from './dummyActivity.json';

function Detail() {
  const parseTags:TagType[] = dummyActivityData.Tags
    .map((tag) => {
      const variant = tag.Type as TagType['variant'];
      return ({
        id: tag.id,
        text: tag.Text,
        variant,
      });
    })
    .slice(0, 5);

  return (
    <>
      <Card
        imgUrl={dummyActivityData.Image[0].ImageUrl}
        tags={parseTags}
        altText={dummyActivityData.Image[0].ImageAlt}
        title="網頁前端工作坊"
      />
      {dummyActivityData.Branch.map((branch) => <DetailProperties branch={branch} />)}
    </>
  );
}

export default Detail;
