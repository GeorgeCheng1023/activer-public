import React, { useEffect, useState } from 'react';

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
    applyStart,
    applyEnd,
    applyFee,
    location,
    dateStart,
    dateEnd,
    status,
    id,
  } = branch;

  // Followed
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(status === '願望');
  }, [status]);

  const renderDateStartElement = () => {
    if (dateStart) {
      return (
        <>
          {Object
            .entries(dateStart)
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
    if ((applyStart && applyEnd) && (applyStart.length === applyEnd.length)) {
      return (
        <>
          {
            applyStart.map((element: string, index: number) => (
              <p key={`detail-apply-start-${index}`}>
                {`${element} ~ ${applyEnd[index]}`}
              </p>
            ))
          }
        </>
      );
    }
    return <p>請看活動原始連結</p>;
  };

  const renderFeeInnerElement = () => {
    if (applyFee) {
      return (
        <>
          {
            applyFee.map((element, index) => (
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
    if (location) {
      return (
        <>
          {
            location.map((element, index) => (
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
        branchId={id.toString()}
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
          <p>{dateEnd ? dateEnd[0] : '請看活動原始連結'}</p>
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
