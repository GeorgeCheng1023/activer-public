import React, { useState, useEffect } from 'react';
import { ManageLoaderType, UserActivityDataType } from 'types/ActivityDataType';
import Card from 'components/Card';
import { parseArrayTagDataToTag } from 'utils/parseTag';
import { useRouteLoaderData, useParams } from 'react-router-dom';
import ManageCardControl from '../ManageCardControl';

function ManageActivity() {
  const loaderData = useRouteLoaderData('manage') as ManageLoaderType;
  const [currentActivities, setCurrentActivities] = useState
  <UserActivityDataType[] | null | undefined>();
  const { filterId = '全部' } = useParams();

  // set activiy display base on filterId in params
  useEffect(() => {
    if (filterId === '願望') {
      setCurrentActivities(loaderData.dream);
    } else if (filterId === '已報名') {
      setCurrentActivities(loaderData.enroll);
    } else {
      setCurrentActivities(loaderData.all);
    }
  }, [filterId, loaderData]);

  return (
    <div className="manage__activity">
      {
        currentActivities
          ? currentActivities.map((activity) => (
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
          : '此項目沒有已註冊的活動'
      }
    </div>
  );
}

export default ManageActivity;
