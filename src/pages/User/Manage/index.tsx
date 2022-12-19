import React, { useState, useMemo } from 'react';
// components
import ManageNav from 'components/ManageNav';
import { BiBorderAll, BiBookmarkHeart, BiEdit } from 'react-icons/bi';
import { CardRow } from 'components/Card';

import { useParseTagDataArray } from 'hooks/tag';
import { UserActivityDataType } from 'types/ActivityDataType';
import dummyUserActivity from './dummy.json';

const filters = [
  {
    id: '全部',
    label: '全部',
    icon: <BiBorderAll />,
  },
  {
    id: '願望',
    label: '願望',
    icon: <BiBookmarkHeart />,
  },
  {
    id: '已報名',
    label: '已報名',
    icon: <BiEdit />,
  },
];

function Manage() {
  const [currentFilterId, setCurrentFilterId] = useState('全部');

  const userActivities: UserActivityDataType[] = useMemo((): UserActivityDataType[] => {
    const parseUserActivities:UserActivityDataType[] = [];
    dummyUserActivity.forEach((activity) => {
      activity.Branches.forEach((branch) => {
        if (!branch.Status) { return; }
        parseUserActivities.push({
          Id: activity.Id,
          Title: activity.Title,
          Image: activity.Image,
          Tags: activity.Tags,
          Branch: branch,
        });
      });
    });
    return parseUserActivities;
  }, []);
  const [currentActivities, setCurrentActivities] = useState<UserActivityDataType[]>(
    userActivities,
  );

  const handleChangeFilter = (selectFilterId: string) => {
    console.log(userActivities);

    setCurrentFilterId(selectFilterId);
    if (selectFilterId === '全部') {
      setCurrentActivities(
        userActivities?.filter((activity) => !!activity.Branch.Status),
      );
    } else {
      setCurrentActivities(
        userActivities?.filter((activity) => activity.Branch.Status === selectFilterId),
      );
    }
    console.log(currentActivities);
  };

  return (
    <>
      <ManageNav
        filters={filters}
        onChangeFilter={handleChangeFilter}
        currentFilterId={currentFilterId}
      />
      {
        currentActivities?.map((activity) => (
          <CardRow
            imgUrl={activity.Image ? activity.Image[0] : '/DefaultActivityPng.png'}
            altText={activity.Title}
            title={activity.Title}
            tags={useParseTagDataArray(activity.Tags)}
            detail={activity.Branch.Status || ''}

          />
        ))
      }
    </>
  );
}

export default Manage;
