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
      <div className="detail__container--top">
        <div className="detail__container--card">
          <Carousel slides={parseImages.map((img) => (
            <img src={img.url} alt={img.alt} />
          ))}
          />
          <h2 className="detail__h2">
            {dummyActivityData.Title}
          </h2>
          <h3 className="detail__h3">
            {dummyActivityData.Subtitle}
          </h3>
          <div className="detail__tags">
            {parseTags.map((tag) => (
              <Tag
                variant={tag.variant}
                text={tag.text}
                id={tag.id}
              />
            ))}
          </div>
          <span>
            主辦單位:
            {dummyActivityData.Holder}
          </span>
        </div>
        <div className="detail__container--properties">
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
      <div className="detail__content">
        <h2 className="detail__h2">
          活動內容
        </h2>
        <p>
          {dummyActivityData.Content}
        </p>
        <br />
        <h2 className="detail__h2">
          原始來源
        </h2>
        <p>
          {dummyActivityData.Holder}
          :
          {' '}
          {dummyActivityData.Source.map((s) => (
            <a className="detail__a" href={s}>{s}</a>
          ))}

        </p>

      </div>
      <br />
    </div>
  );
}

export default Detail;
