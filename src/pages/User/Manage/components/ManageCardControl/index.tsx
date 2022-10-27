import React, { useState } from 'react';
import './index.scss';
import FormDropDown from '../../../../../components/Form/FormDropdown';

type Props = {
  beginDate: string,
  dueDate: string
};

function ManageCardControl({ beginDate, dueDate }: Props) {
  const [selectedValue, setSelectedValue] = useState('已報名');
  const today = new Date();
  const parseBeginDate = new Date(beginDate);
  const parseDueDate = new Date(dueDate);
  const remainDueDate = parseDueDate.getDate() - today.getDate();
  const remainBeginDate = parseBeginDate.getDate() - today.getDate();

  return (
    <div className="manage-control">
      <div className="manage-control__date">
        <div className="date__begin">
          活動開始日期：
          {beginDate}
          <p className="remain-date">
            剩餘天數：
            <span className="remain-date__number">
              {
                remainBeginDate > 0 ? beginDate : '已過期'
              }
            </span>
          </p>
        </div>
        <div className="
        date__due"
        >
          活動截止日期：
          {dueDate}
          <p className="remain-date">
            剩餘天數：
            <span className="remain-date__number">
              {
                remainDueDate > 0 ? remainDueDate : '已過期'
              }
            </span>
          </p>
        </div>
      </div>
      <div className="manage-control__select">
        <FormDropDown dropdownStyle="default" labelText="狀態" selectedValue={selectedValue} setSelectedValue={setSelectedValue} options={[{ id: 1, value: '已報名' }, { id: 2, value: '願望' }]} />
      </div>
    </div>
  );
}

export default ManageCardControl;
