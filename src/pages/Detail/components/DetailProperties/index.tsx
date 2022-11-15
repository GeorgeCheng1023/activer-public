import React from 'react';

// componenst
import Property from './Property';

// style
import './index.scss';

type Props = {
  branch: any
};

function DetailProperties({ branch } : Props) {
  const { Apply, Location, Date } = branch;

  const date = `${Date.DateStart ? Date.DateStart.toString() : '即日起'} - ${Date.DateEnd ? Date.DateEnd.toString() : '請見活動原始連結'}`;
  const applyDate = `${Apply.ApplyStart ? Apply.ApplyStart.toString() : '即日起'} - ${Apply.ApplyEnd ? Apply.ApplyEnd.toString() : '請見活動原始連結'}`;

  return (
    <div className="detail__properties">
      <Property
        name="date"
        label="日期"
        innerText={date}
      />
      <Property
        name="location"
        label="地點"
        innerText={Location}
      />
      <Property
        name="apply"
        label="報名日期"
        innerText={applyDate}
      />
      <Property
        name="form"
        label="報名連結"
        innerText={Apply.ApplyForm}
        propertyType="link"
      />
      <Property
        name="fee"
        label="報名費"
        innerText={Apply.ApplyFee}
      />
    </div>
  );
}

export default DetailProperties;
