import React, { useState, useEffect } from 'react';
import { ManageLoaderType, UserActivityDataType } from 'types/ActivityDataType';
import Card from 'components/Card';
import { parseArrayTagDataToTag } from 'utils/parseTag';
import { useRouteLoaderData, useParams } from 'react-router-dom';
import ManageCardControl from '../ManageCardControl';

function ManageActivity() {
  const loaderData = useRouteLoaderData('manage') as ManageLoaderType;
  const [currentActivities, setCurrentActivities] = useState<UserActivityDataType[]>([]);
  const { filterId = '全部' } = useParams();

  // set activiy display base on filterId in params
  useEffect(() => {
    if (filterId === '願望') {
      setCurrentActivities(loaderData.dream);
    } else if (filterId === '已報名') {
      setCurrentActivities(loaderData.enroll);
    } else if (filterId === '已完成') {
      setCurrentActivities(loaderData.done);
    } else {
      setCurrentActivities(loaderData.all);
    }
    console.log(currentActivities);
  }, [filterId, loaderData]);

  return (
    <div className="manage__activity">
      {
        currentActivities && currentActivities.length > 0
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
