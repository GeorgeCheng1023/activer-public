import React, { useState, useCallback, useEffect } from 'react';
// components
import ManageNav from 'components/ManageNav';
import { BiBorderAll, BiBookmarkHeart, BiEdit } from 'react-icons/bi';
import Card from 'components/Card/Default';

import { useParseTagDataArray } from 'hooks/tag';
import { UserActivityDataType } from 'types/ActivityDataType';
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
    // TODO: get user activity
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
        userActivities.filter((activity) => !!activity.Branch.Status),
      );
    } else {
      setCurrentActivities(
        userActivities.filter((activity) => activity.Branch.Status === selectFilterId),
      );
    }
  }, [userActivities]);

  return (
    <div className="manage">
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
              key={`manage-activity-${activity.Branch.Id}`}
              id={`manage-activity-${activity.Branch.Id}`}
              imgUrl={activity.Image ? activity.Image[0] : '/DefaultActivityPng.png'}
              altText={activity.Title}
              title={activity.Title}
              tags={useParseTagDataArray(activity.Tags)}
              detail={activity.Branch.BranchName}
              control={(
                <ManageCardControl
                  branch={activity.Branch}
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
