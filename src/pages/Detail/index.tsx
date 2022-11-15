import React, { useState } from 'react';

// components
import Card from 'components/Card';
import { TagType } from 'components/Tag';
import ManageNav from 'components/ManageNav';
import DetailProperties from './components/DetailProperties';
// data
import dummyActivityData from './dummyActivity.json';
// style
import './index.scss';

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

  const branches = dummyActivityData.Branch;
  const [currentBranch, setCurrentBranch] = useState(branches[0]);

  const handleChangeFilter = (selectedId : number) => {
    setCurrentBranch(branches[selectedId]);
  };
  return (
    <div className="detail">
      <div className="detail__card__container">
        <Card
          imgUrl={dummyActivityData.Image[0].ImageUrl}
          tags={parseTags}
          altText={dummyActivityData.Image[0].ImageAlt}
          title="網頁前端工作坊"
        />
      </div>
      <div className="detail__properties__container">
        <ManageNav
          buttons={
            branches.map((branch) => ({
              title: branch.BranchName,
            }))
          }
          onChangeFilter={handleChangeFilter}
        />
        <DetailProperties branch={currentBranch} />
      </div>
    </div>
  );
}

export default Detail;
