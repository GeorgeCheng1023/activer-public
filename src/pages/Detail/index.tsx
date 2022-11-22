import React, { useState } from 'react';

// components
import Carousel from 'components/Carousel';
import Tag, { TagType } from 'components/Tag';
import ManageNav from 'components/ManageNav';
import DetailProperties from './components/DetailProperties';
import Comment from './components/Comment';
// data
import dummyActivityData from './dummyActivity.json';

// style
import './index.scss';

function Detail() {
  const {
    Title,
    Subtitle,
    Holder,
    Images,
    Objective,
    Connection,
    Content,
    Source,
    Tags,
    Branches,
  } = dummyActivityData;

  const parseTags:TagType[] = Tags
    .map((tag) => {
      const variant = tag.Type as TagType['variant'];
      return ({
        id: tag.TagId.toString(),
        text: tag.Text,
        variant,
      });
    })
    .slice(0, 5);
    // eslint-disable-next-line
  const parseImages =Images
    .map((Image:any) => (
      {
        url: Image.ImageUrl,
        alt: Image.ImageAlt,
      }
    ));

  const [currentBranch, setCurrentBranch] = useState(Branches[0]);

  const handleChangeFilter = (selectedId : number) => {
    setCurrentBranch(Branches[selectedId]);
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
            {Title}
          </h2>
          <h3 className="detail__h3">
            {Subtitle}
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
            {Holder}
          </span>
        </div>
        <div className="detail__container--properties">
          <ManageNav
            buttons={
              Branches.map((branch: any) => ({
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
          活動對象
        </h2>
        <p>
          {Objective}
        </p>
        <br />
        <h2 className="detail__h2">
          活動內容
        </h2>
        <p>
          {Content}
        </p>
        <br />
        <h2 className="detail__h2">
          原始來源
        </h2>
        <p>
          {Holder}
          :
          {' '}
          {Source.map((s) => (
            <a className="detail__a" href={s}>{s}</a>
          ))}

        </p>

        <h2 className="detail__h2">
          聯絡資訊
        </h2>
        <p>
          {Connection}
        </p>
        <br />
        <div className="detail__comment">
          <Comment />
        </div>
      </div>
      <br />
    </div>
  );
}

export default Detail;
