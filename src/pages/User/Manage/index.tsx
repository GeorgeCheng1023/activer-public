import React, { useEffect, useState } from 'react';
// components
import { BiBorderAll } from 'react-icons/bi';
import { BsBookmarkHeart } from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import ManageNav from 'components/ManageNav';
import { useParseTagDataArray } from 'hooks/tag';
import { ManageNavFilterProps } from 'components/ManageNav/ManageNavButton';
import ManageActivityItem from './components/ManageActivityItem';

// dummyData
import dummyActivity from './dummy.json';
// style
import './index.scss';

const filters: ManageNavFilterProps[] = [
  {
    id: '全部',
    name: '全部',
    icon: <BiBorderAll />,
  },
  {
    id: '已報名',
    name: '已報名',
    icon: <AiOutlineCheckCircle />,
  },
  {
    id: '願望',
    name: '願望',
    icon: <BsBookmarkHeart />,
  },

];

function Manage() {
  const [userActivity, setUserActivity] = useState(dummyActivity);
  const [currentFilterName, setCurrentFilterName] = useState('全部');

  const handleChangFilter = (selectFilterStatus: string) => {
    setCurrentFilterName(selectFilterStatus);
  };

  useEffect(() => {
    if (currentFilterName === '全部') {
      setUserActivity(dummyActivity);
    } else {
      setUserActivity(
        dummyActivity
          .filter((activity) => {
            console.log('filter:', activity.Branch.Status, currentFilterName);
            return (activity.Branch.Status === currentFilterName);
          }),
      );
    }
  }, [currentFilterName, setCurrentFilterName]);

  return (
    <>
      <ManageNav
        filters={filters}
        onChangeFilter={handleChangFilter}
        currentFilterId={currentFilterName}
      />
      <div className="manage__items">
        {userActivity.map((activity) => (
          <ManageActivityItem
            title={activity.Title}
            imgUrl={activity.Image ? activity.Image[0] : '/DefaultActivityPng.png'}
            altText={activity.Branch.BranchName}
            tags={useParseTagDataArray(activity.Tags)}
            detail={activity.Branch.BranchName}
            applyEndDate={activity.Branch.ApplyEnd[0]}
            beginDate={Object.values(activity.Branch.DateStart)[0]}
            status={activity.Branch.Status}
          />
        ))}

      </div>

    </>
  );
}

export default Manage;
