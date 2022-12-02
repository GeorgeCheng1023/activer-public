import React from 'react';
// style
import './index.scss';

type Props = {
  name: string,
  label: string,
  innerElement: JSX.Element,
};

function Property({
  name: className, label, innerElement,
}: Props) {
  return (
    <div className={`detail__property detail__property__${className}`}>
      <h2 className="detail__h2">{label}</h2>
      {innerElement}
    </div>
  );
}

export default Property;
