import React from 'react';

type Props = {
  branch: any
};

type PropertyProps = {
  className: string,
  label: string,
  innerText: string,
};

function Property({ className, label, innerText }: PropertyProps) {
  return (
    <div className={`detail__property__${className}`}>
      <h2 className="detail__h2">{label}</h2>
      <p className="detail__p">{innerText}</p>
    </div>
  );
}

function DetailProperties({ branch } : Props) {
  const { Apply, Location, Date } = branch;

  const date = `${Date.DateStart ? Date.DateStart.toString() : '即日起'} - ${Date.DateEnd ? Date.DateEnd.toString() : '請見活動原始連結'}`;
  const applyDate = `${Apply.ApplyStart ? Apply.ApplyStart.toString() : '即日起'} - ${Apply.ApplyEnd ? Apply.ApplyEnd.toString() : '請見活動原始連結'}`;

  return (
    <>
      <Property
        className="date"
        label="日期"
        innerText={date}
      />
      <Property
        className="location"
        label="地點"
        innerText={Location}
      />
      <Property
        className="apply"
        label="報名日期"
        innerText={applyDate}
      />
      <Property
        className="form"
        label="報名連結"
        innerText={Apply.ApplyForm}
      />
      <Property
        className="fee"
        label="報名費"
        innerText={Apply.ApplyFee}
      />
    </>
  );
}

export default DetailProperties;
