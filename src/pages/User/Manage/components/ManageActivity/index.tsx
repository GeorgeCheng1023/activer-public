import React from 'react';
import { UserActivityDataType } from 'types/ActivityDataType';
import Card from 'components/Card';
import { parseArrayTagDataToTag } from 'utils/parseTag';

import ManageCardControl from '../ManageCardControl';

interface ManageActivityType {
  activities : UserActivityDataType[] | undefined;
}

function ManageActivity({ activities }: ManageActivityType) {
  return (
    <div className="manage__activity">
      {
        activities && activities.length > 0
          ? activities.map((activity) => (
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
