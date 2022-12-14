import React from 'react';
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
      <h3 className="detail__h2">{label}</h3>
      {innerElement}
    </div>
  );
}

export default Property;
