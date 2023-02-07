import React, { useState, useCallback, useEffect } from 'react';
// components
import ManageNav from 'components/ManageNav';
import { BiBorderAll, BiBookmarkHeart, BiEdit } from 'react-icons/bi';
import Card from 'components/Card';

import { parseArrayTagDataToTag } from 'utils/parseTag';
import { BranchDataType, UserActivityDataType } from 'types/ActivityDataType';
import dummyUserActivity from './dummy.json';
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

  /**  function to fetch user Data */
  const getUserActivity = useCallback(() => {
    const parseUserActivities:UserActivityDataType[] = [];
    dummyUserActivity.forEach((activity) => {
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
    setUserActivities(parseUserActivities);
    setCurrentActivities(parseUserActivities);
  }, []);
  /** execute getUserActivity in first time render */
  useEffect(() => {
    getUserActivity();
  }, []);

  /** handler to listen activity's Status dropdown change */
  const handleChangeActivityStatus = useCallback((branchId: number, key:string, value: string) => {
    // TODO: update branch Status
    console.log(branchId, key, value);
    getUserActivity();
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
              tags={parseArrayTagDataToTag(activity.tags)}
              detail={activity.branch.branchName}
              control={(
                <ManageCardControl
                  branch={activity.branch}
                  onChange={handleChangeActivityStatus}
                />
              )}
            />
          ))
        }
      </div>
    </div>
  );
}

export default Manage;
