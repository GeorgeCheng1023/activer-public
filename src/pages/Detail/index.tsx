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
  DetailComment,
  DetailImage,
  DetailSources,
  DetailTags,
  DetailProperties,
  DetailConnection,
  DetailSubtitle,
  DetailHolder,
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
    setCurrentBranch(data.Branches[parseInt(selectedId, 10)]);
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

        {/* left container: image, title,tags, date, holder */}
        <div className="detail__container--card">
          <DetailImage
            id={Id}
            image={Image}
            altText={Title}
          />
          <h2>{Title}</h2>
          <DetailSubtitle subtitle={Subtitle} />
          <DetailTags tags={Tags} />
        </div>
        {/* right container: branch properties */}
        <div className="detail__container--properties">
          <ManageNav
            filters={
              data.Branches.map((branch: any, index: number) => ({
                id: index.toString(),
                name: branch.BranchName,
              }))
            }
            onChangeFilter={handleChangeFilter}
            currentFilterId={currentBranch.toString()}
          />
          <DetailProperties branch={currentBranch} activityId={Id.toString()} />
        </div>
      </div>

      {/* main context */}
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
            {Content.replace(/[\u3002]/g, '')}
          </Linkify>
        </div>
        <DetailSources sources={Sources} id={Id} />
        <DetailConnection connection={Connection} />
        <DetailHolder holder={Holder} />
        <DetailComment />
      </div>
    </div>
  );
}

export default Detail;
