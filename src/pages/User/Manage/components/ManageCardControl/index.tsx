import React, { useState } from 'react';
import { UserActivityDataType } from 'types/ActivityDataType';
import { FormDropDown } from 'components/Form';
import './index.scss';
import { useCookies } from 'react-cookie';
import { Form, useSubmit } from 'react-router-dom';

interface ManageCardControlType {
  activity: UserActivityDataType;
}

function ManageCardControl({ activity } :ManageCardControlType) {
  const { id: activityId, branch } = activity;
  const { id: branchId, status } = branch;
  const [currentStatus, setCurrentStatus] = useState(status);
  const [cookies] = useCookies<string>(['user']);
  const submit = useSubmit();

  // set formData befor submit
  const formData = new FormData();
  const handleChange = (key: any, value: any) => {
    setCurrentStatus(value);
    formData.set('status', value);
    formData.set('activityId', activityId.toString());
    formData.set('branchId', branchId.toString());
    formData.set('sessionToken', cookies.sessionToken);
  };

  return (
    <Form
      className="manage__control"
      method="post"
      onChange={() => {
        // after underneath submit, the router action will call
        submit(formData, { method: 'post' });
      }}
    >

      <div className="manage__control__status">
        <FormDropDown
          options={['已報名', '願望', '已完成']}
          id={`manage-contro-${branchId}`}
          label="狀態"
          name="status"
          value={currentStatus || '願望'}
          onChange={handleChange}
        />
      </div>
    </Form>
  );
}

export default ManageCardControl;
