import React, { useState } from 'react';
import FormDropDown from '../../../../../components/Form/FormDropdown';

type Props = {
  beginTime: Date,
  dueTime: Date
};

function ManageCardControl({ beginTime, dueTime }: Props) {
  const [selectedValue, setSelectedValue] = useState('已報名');

  return (
    <>
      <p>{beginTime.toString()}</p>
      <p>{dueTime.toString()}</p>
      <FormDropDown dropdownStyle="default" labelText="狀態" selectedValue={selectedValue} setSelectedValue={setSelectedValue} options={[{ id: 1, value: '已報名' }, { id: 2, value: '願望' }]} />
    </>
  );
}

export default ManageCardControl;
