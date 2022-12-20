import React from 'react';
import { BranchDataType } from 'types/ActivityDataType';
import { FormDropDown } from 'components/Form';

interface ManageCardControlType {
  branch: BranchDataType;
  onChange: (branchId: number, key: any, value: any) => void;
}

function ManageCardControl({ branch, onChange } :ManageCardControlType) {
  const {
    Id, DateStart, ApplyEnd, Status,
  } = branch;
  const handleChange = (key: any, value: any) => {
    onChange(Id, key, value);
  };

  return (
    <>
      <div className="manage-card-control__date-start">
        <p>活動開始日期:</p>
        {DateStart ? <p>{Object.values(DateStart)[0]}</p> : '詳見活動詳細頁面'}
      </div>
      <div className="manage-card-control__apply-end">
        <p>活動報名截止日期:</p>
        {ApplyEnd ? ApplyEnd[0] : '詳見活動詳細頁面'}
      </div>
      <FormDropDown
        options={['已報名', '願望']}
        id={`manage-contro-${Id}`}
        label="狀態"
        name={`manage-contro-${Id}`}
        value={Status || '願望'}
        onChange={handleChange}
      />
    </>
  );
}

export default ManageCardControl;
