import React from 'react';
// components
import { BiBorderAll } from 'react-icons/bi';
import { BsBookmarkHeart } from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import ManageNav from 'components/ManageNav';
import { useParseTagDataArray } from 'hooks/tag';
import ManageActivityItem from './components/ManageActivityItem';

// dummyData
import dummyActivity from './dummy.json';
// style
import './index.scss';

function Manage() {
  const changeFilterHandler = (id: number) => {
    console.log(id);
  };

  return (
    <>
      <ManageNav
        buttons={
          [
            {
              title: '全部',
              icon: <BiBorderAll />,
            },
            {
              title: '已報名',
              icon: <AiOutlineCheckCircle />,
            },
            {
              title: '願望',
              icon: <BsBookmarkHeart />,
            },
          ]
        }
        onChangeFilter={changeFilterHandler}
      />
      <div className="manage__items">
        {dummyActivity.map((activity) => {
          const focusBranch = activity.Branches.filter((branch) => branch.Status != null)[0];

          return (
            <ManageActivityItem
              title={activity.Title}
              imgUrl={activity.Image ? activity.Image[0] : '/DefaultActivityPng.png'}
              altText={focusBranch.BranchName}
              tags={useParseTagDataArray(activity.Tags)}
              detail={focusBranch.BranchName}
              applyEndDate={focusBranch.ApplyEnd[0]}
              beginDate={Object.values(focusBranch.DateStart)[0]}
            />
          );
        })}

      </div>

    </>
  );
}

export default Manage;
