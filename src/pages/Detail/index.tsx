import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Linkify from 'linkify-react';
// api
import { getActivity } from 'api/axios';
// type
import ActivityDataType, { BranchDataType } from 'types/ActivityDataType';

// components
import ManageNav from 'components/ManageNav';
import {
  DetailComment, DetailImage, DetailSources, DetailTags, DetailProperties,
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
  const handleChangeFilter = (selectedId : number) => {
    setCurrentBranch(data.Branches[selectedId]);
  };

  // get data
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

  // destructing data
  const {
    Id, Image, Title, Subtitle, Tags, Holder, Objective, Content, Sources, Connection,
  } = data;

  return (
    <div className="detail">
      <div className="detail__container--intro">
        <div className="detail__container--card">
          <DetailImage
            id={Id}
            image={Image}
            altText={Title}
          />
          <h2>{Title}</h2>
          <h3>{Subtitle}</h3>

          <DetailTags tags={Tags} />

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
      <div className="detail__context">
        <div className="detail__objective">
          <h2>活動對象</h2>
          <p>{Objective}</p>
        </div>
        <br />
        <div className="detail__content">
          <h2>活動內容</h2>
          <Linkify
            as="p"
            options={{
              target: '_blank',
              className: 'detail__a',
            }}
          >
            {Content}

          </Linkify>
        </div>
        <br />
        <div className="detail__source">
          <h2>原始來源</h2>
          <p>
            {Holder}
            :
            <DetailSources sources={Sources} id={Id} />
          </p>
        </div>
        <div className="detail__connection">
          <h2>聯絡資訊</h2>
          <p>{Connection}</p>
        </div>
        <br />
        <div className="detail__comment">
          <DetailComment />
        </div>
      </div>
      <br />
    </div>
  );
}

export default Detail;
