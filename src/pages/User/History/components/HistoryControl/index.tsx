import React from 'react';
import { Link } from 'react-router-dom';

// components
import Button from 'components/Button';
import { FaComments, FaEdit } from 'react-icons/fa';
import './index.scss';

export interface historyControlType {
  activityId: number;
}

function HistoryControl({ activityId }: historyControlType) {
  return (
    <div className="history-control">
      <Button
        color="white"
        iconBefore={<FaComments />}
        text="評論"
      />
      <Link to={`/user/record/${activityId}`}>
        <Button
          color="white"
          iconBefore={<FaEdit />}
          text="心得記錄"
        />
      </Link>
    </div>
  );
}

export default HistoryControl;
