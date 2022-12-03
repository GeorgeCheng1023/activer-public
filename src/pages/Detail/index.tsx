import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// api
import { getActivity } from 'api/axios';
// type
import ActivityDataType, { BranchDataType, TagDataType } from 'types/ActivityDataType';
// components
import Carousel from 'components/Carousel';
import Tag, { TagType } from 'components/Tag';
import ManageNav from 'components/ManageNav';
import Button from 'components/Button';
import { FaEdit } from 'react-icons/fa';
import IconLogo from 'components/Icons';
import DetailProperties from './components/DetailProperties';
import Comment from './components/Comment';
import CommentPanel from './components/CommentPanel';
// style
import './index.scss';

const initialBranchesState: BranchDataType = {
  BranchName: '',
  DateStart: null,
  DateEnd: [],
  ApplyStart: [],
  ApplyEnd: [],
  ApplyFee: [],
  Location: [],
};
const initialDataState:ActivityDataType = {
  Id: 0,
  Title: '',
  Content: '',
  Connection: [],
  Holder: [],
  Image: [],
  Tags: [],
  Objective: [],
  Sources: [],
  Subtitle: '',
  Branches: [initialBranchesState],
};

function Detail() {
  const { id } = useParams();
  const [data, setData] = useState<ActivityDataType>(initialDataState);
  const [currentBranch, setCurrentBranch] = useState<BranchDataType>(initialBranchesState);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        if (!id) throw new Error('No id provided');
        const res = await getActivity(id.toString());
        setData(res.data);
        setCurrentBranch(res.data.Branches[0]);
      } catch (err) {
        console.error(err);
      }
    };
    dataFetch();
  }, []);

  const handleChangeFilter = (selectedId : number) => {
    setCurrentBranch(data.Branches[selectedId]);
  };

  // display comment push panel
  const [displayCommentPanel, setDisplayCommentPanel] = useState(false);
  const handleOpenCommentPanel = (e: any) => {
    e.preventDefault();
    setDisplayCommentPanel(true);
  };

  const {
    Id, Image, Title, Subtitle, Tags, Holder, Objective, Content, Sources, Connection,
  } = data;
  // Image
  function renderImage() {
    if (Image) {
      return (
        <div className="detail__img">
          <Carousel
            slides={Image.map((img: any, index: number) => (
              <img key={`img-${Id}${index}`} src={img.url} alt={Title} />
            ))}
          />
        </div>
      );
    }
    return (
      <div className="detail__img">
        <IconLogo />
      </div>
    );
  }
  function renderTags() {
    if (Tags) {
      return (
        Tags.map((tag: TagDataType) => {
          const variant = tag.Type as TagType['variant'];
          return (
            <Tag
              id={tag.Id!.toString()}
              key={tag.Id!.toString()}
              text={tag.Text}
              variant={variant}
              onClick={() => handleChangeFilter(tag.Id)}
            />
          );
        }).slice(0, 5)
      );
    }
    return null;
  }

  function renderSources() {
    if (Sources) {
      return (
        Sources.map((s: any, index: number) => (
          <a className="detail__a" href={s} key={`source-${Id}-${index}`}>{s}</a>
        ))
      );
    }
    return null;
  }

  return (
    <div className="detail">
      <div className="detail__container--top">
        <div className="detail__container--card">
          {renderImage()}
          <h2 className="detail__h2">
            {Title}
          </h2>
          <h3 className="detail__h3">
            {Subtitle}
          </h3>
          <div className="detail__tags">
            {renderTags()}
          </div>
          <span>
            主辦單位:
            {Holder}
          </span>
        </div>
        <div className="detail__container--properties">
          <ManageNav
            buttons={
              data.Branches.map((branch: any) => ({
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
          {renderSources()}
        </p>

        <h2 className="detail__h2">
          聯絡資訊
        </h2>
        <p>
          {Connection}
        </p>
        <br />
        <div className="detail__comment">
          <div className="detail__comment__title">
            <h2 className="detail__h2">
              活動評論
            </h2>
            <Button
              text="撰寫評論"
              iconBefore={<FaEdit />}
              size="sm"
              onClick={handleOpenCommentPanel}
            />

          </div>
          <Comment />
          {displayCommentPanel
          && <CommentPanel setDisplayCommentPanel={setDisplayCommentPanel} />}
        </div>
      </div>
      <br />
    </div>
  );
}

export default Detail;
