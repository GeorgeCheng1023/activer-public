import React, { useState } from 'react';
import { UserActivityDataType } from 'types/ActivityDataType';
import { FormDropDown } from 'components/Form';
import './index.scss';
import { postActivityStatus } from 'api/activity';
import { useCookies } from 'react-cookie';

interface ManageCardControlType {
  activity: UserActivityDataType;
}

function ManageCardControl({ activity } :ManageCardControlType) {
  const { id: activityId, branch } = activity;
  const { id: branchId, status } = branch;
  const [currentStatus, setCurrentStatus] = useState(status);
  const [cookies] = useCookies<string>(['user']);
  const [error, setError] = useState<any>(null);

  const handleChange = async (key: any, value: any) => {
    try {
      await postActivityStatus(
        activityId.toString(),
        branchId.toString(),
        value,
        cookies.sessionToken,
      );
      setCurrentStatus(value);
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <div className="manage__control">

      <div className="manage__control__status">
        <FormDropDown
          options={['已報名', '願望']}
          id={`manage-contro-${branchId}`}
          label="狀態"
          name={`manage-contro-${branchId}`}
          value={currentStatus || '願望'}
          onChange={handleChange}
        />
      </div>
      {error && (
        <div className="manage__control__error">
          更新失敗:
          {error.message}
        </div>
      )}
    </div>
  );
}

export default ManageCardControl;
