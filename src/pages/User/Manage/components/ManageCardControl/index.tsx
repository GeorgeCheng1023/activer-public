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

  const handleChange = (key: any, value: any) => {
    setSelectedValue(value as string);
    // submit change
    // eslint-disable-next-line
    console.log(`submit ${key}: ${selectedValue}`)
  };

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
      <form className="manage-control__select">
        <FormDropDown
          dropdownProps={{
            label: '狀態',
            name: 'status',
            options: [
              { value: 'registered', key: '已報名' },
              { value: 'dream', key: '願望' },
            ],
          }}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default ManageCardControl;
