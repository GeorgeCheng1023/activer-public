import React from 'react';
import { BranchDataType } from 'types/ActivityDataType';
import { FormDropDown } from 'components/Form';
import './index.scss';

interface ManageCardControlType {
  branch: BranchDataType;
  onChange: (branchId: number, key: any, value: any) => void;
}

function ManageCardControl({ branch, onChange } :ManageCardControlType) {
  const {
    id: Id, dateStart: DateStart, applyEnd: ApplyEnd, status: Status,
  } = branch;
  const handleChange = (key: any, value: any) => {
    onChange(Id, key, value);
  };

  return (
    <div className="manage-control">
      <div className="manage-control__date-start">
        <p className="manage-control__label">活動開始日期:</p>
        {DateStart ? <p>{Object.values(DateStart)[0]}</p> : '詳見活動詳細頁面'}
      </div>
      <div className="manage-control__apply-end">
        <p className="manage-control__label">活動報名截止日期:</p>
        {ApplyEnd ? ApplyEnd[0] : '詳見活動詳細頁面'}
      </div>
      <div className="manage-control__status">
        <FormDropDown
          options={['已報名', '願望']}
          id={`manage-contro-${Id}`}
          label="狀態"
          name={`manage-contro-${Id}`}
          value={Status || '願望'}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default ManageCardControl;
