import React from 'react';

// type
import { BranchDataType } from 'types/ActivityDataType';
// componenst
import Property from './Property';

type Props = {
  branch : BranchDataType,
};

function DetailProperties({ branch }: Props) {
  const {
    ApplyStart,
    ApplyEnd,
    ApplyFee,
    Location,
    DateStart,
    DateEnd,
  } = branch;

  const renderDateStartElement = () => {
    if (DateStart) {
      return (
        <>
          {Object
            .entries(DateStart)
            .map((element) => (<p>{`${element[0]}: ${element[1]}`}</p>))}
        </>
      );
    }
    return <p>請看活動原始連結</p>;
  };

  const renderApplyDateInnerElement = () => {
    if ((ApplyStart && ApplyEnd) && (ApplyStart.length === ApplyEnd.length)) {
      return (
        <>
          {
            ApplyStart.map((element: string, index: number) => (
              <p>
                {`${element} ~ ${ApplyEnd[index]}`}
              </p>
            ))
          }
        </>
      );
    }
    return <p>請看活動原始連結</p>;
  };

  const renderFeeInnerElement = () => {
    if (ApplyFee) {
      return (
        <>
          {
            ApplyFee.map((element) => (
              <p>
                {element}
              </p>
            ))
          }
        </>
      );
    }
    return <p>請看活動原始連結</p>;
  };

  const renderLocationInnerElement = () => {
    if (Location) {
      return (
        <>
          {
            Location.map((element) => (
              <p>
                {element}
              </p>
            ))
          }
        </>
      );
    }
    return <p>請看活動原始連結</p>;
  };

  return (
    <div className="detail__properties">
      <Property
        name="date"
        label="活動開始時間"
        innerElement={
          renderDateStartElement()
        }
      />
      <Property
        name="location"
        label="活動結束日期"
        innerElement={
          <p>{DateEnd ? DateEnd[0] : '請看活動原始連結'}</p>
        }
      />
      <Property
        name="apply"
        label="報名日期"
        innerElement={
          renderApplyDateInnerElement()
        }
      />
      <Property
        name="fee"
        label="報名費"
        innerElement={
          renderFeeInnerElement()
        }
      />
      <Property
        name="location"
        label="活動地點"
        innerElement={
          renderLocationInnerElement()
        }
      />
    </div>
  );
}

export default DetailProperties;
