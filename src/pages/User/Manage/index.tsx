import React, { useState, useCallback, useEffect } from 'react';
// components
import ManageNav from 'components/ManageNav';
import { BiBorderAll, BiBookmarkHeart, BiEdit } from 'react-icons/bi';
import Card from 'components/Card';

import { parseArrayTagDataToTag } from 'utils/parseTag';
import { BranchDataType, ManageResponseDataType, UserActivityDataType } from 'types/ActivityDataType';
import { getManageActivity } from 'api/activity';
import getCookie from 'utils/getCookies';
import { useLoaderData } from 'react-router-dom';
import ManageCardControl from './components/ManageCardControl';
import './index.scss';

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

function parseManageResponseToUserActivity(data: ManageResponseDataType[])
  : UserActivityDataType[] {
  const parseUserActivities:UserActivityDataType[] = [];
  data.forEach((activity) => {
    activity.branches.forEach((branch: BranchDataType) => {
      if (!branch.status) { return; }
      parseUserActivities.push({
        id: activity.id,
        title: activity.title,
        images: activity.images,
        tags: activity.tags,
        branch,
      });
    });
  });
  return parseUserActivities;
}

export async function loader() {
  const res = await getManageActivity(getCookie('sessionToken'));
  console.log('loader call');
  return parseManageResponseToUserActivity(res.data);
}

function Manage() {
  /** State init
   * @userActivities  User's activity
   * @currentFilterId ManageNav Curreent Filter is which, will based on upper filters.id
   * @currentActivities Filtering {userActivities} based on currentFilterId
   */
  const [userActivities, setUserActivities] = useState<UserActivityDataType[]>();
  const [currentFilterId, setCurrentFilterId] = useState('全部');
  const [
    currentActivities,
    setCurrentActivities,
  ] = useState<UserActivityDataType[] | undefined>();
  const loaderData = useLoaderData() as UserActivityDataType[];

  /** execute getUserActivity in first time render */
  useEffect(() => {
    setUserActivities(loaderData);
    setCurrentActivities(loaderData);
  }, []);

  /** handler to listen ManageNav Change and
   * change currentActivities */
  const handleChangeFilter = useCallback((selectFilterId: string) => {
    if (!userActivities) {
      setCurrentActivities(undefined);
      return;
    }
    setCurrentFilterId(selectFilterId);
    if (selectFilterId === '全部') {
      setCurrentActivities(
        userActivities.filter((activity) => !!activity.branch.status),
      );
    } else {
      setCurrentActivities(
        userActivities.filter((activity) => activity.branch.status === selectFilterId),
      );
    }
  }, [userActivities]);

  return (
    <div className="manage">
      <h2>管理活動</h2>
      {/* filter navbar */}
      <ManageNav
        filters={filters}
        onChangeFilter={handleChangeFilter}
        currentFilterId={currentFilterId}
      />
      <div className="manage__activity">
        {
          currentActivities?.map((activity) => (
            <Card
              key={`manage-activity-${activity.branch.id}`}
              id={`manage-activity-${activity.branch.id}`}
              imgUrl={activity.images ? activity.images[0] : '/DefaultActivityPng.png'}
              altText={activity.title}
              title={activity.title}
              tags={parseArrayTagDataToTag(activity.tags || [])}
              detail={activity.branch.branchName}
              control={<ManageCardControl activity={activity} />}
            />
          ))
        }
      </div>
    </div>
  );
}

export default Manage;
