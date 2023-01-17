import React, { useState } from 'react';

// type
import { BranchDataType } from 'types/ActivityDataType';
import FollowButton from './FollowButton';
// componenst
import Property from './Property';
import './index.scss';

type Props = {
  branch : BranchDataType,
  activityId: string,
};

function DetailProperties({ branch, activityId }: Props) {
  const {
    applyStart: ApplyStart,
    applyEnd: ApplyEnd,
    applyFee: ApplyFee,
    location: Location,
    dateStart: DateStart,
    dateEnd: DateEnd,
    status: Status,
    id: Id,
  } = branch;

  // Followed
  const [followed, setFollowed] = useState(!!Status);

  const renderDateStartElement = () => {
    if (DateStart) {
      return (
        <>
          {Object
            .entries(DateStart)
            .map((element, index) => (
              <p
                key={`detail-date-start-${index}`}
              >
                {`${element[0]}: ${element[1]}`}
              </p>
            ))}
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
              <p key={`detail-apply-start-${index}`}>
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
            ApplyFee.map((element, index) => (
              <p key={`detail-apply-feet-${index}`}>
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
            Location.map((element, index) => (
              <p key={`detail-location-${index}`}>
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
      <FollowButton
        followed={followed}
        setFollowed={setFollowed}
        activityId={activityId}
        branchId={Id.toString()}
      />
      <Property
        name="date-start"
        label="活動開始時間"
        innerElement={
          renderDateStartElement()
        }
      />
      <Property
        name="date-end"
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
