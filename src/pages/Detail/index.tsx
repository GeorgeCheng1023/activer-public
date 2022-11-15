import React, { useState } from 'react';

// components
import Carousel from 'components/Carousel';
import Tag, { TagType } from 'components/Tag';
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
    // eslint-disable-next-line
  const parseImages = dummyActivityData.Images
    .map((Image:any) => (
      {
        url: Image.ImageUrl,
        alt: Image.ImageAlt,
      }
    ));

  const branches = dummyActivityData.Branch;
  const [currentBranch, setCurrentBranch] = useState(branches[0]);

  const handleChangeFilter = (selectedId : number) => {
    setCurrentBranch(branches[selectedId]);
  };
  return (
    <div className="detail">
      <div className="detail__card__container">
        <Carousel />
        <h2 className="detaul__h2">
          {dummyActivityData.Title}
        </h2>
        {parseTags.map((tag) => (
          <Tag
            variant={tag.variant}
            text={tag.text}
            id={tag.id}
          />
        ))}
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
