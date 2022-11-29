import React from 'react';
// style
import './index.scss';

type Props = {
  name: string,
  label: string,
  innerText: string,
  propertyType?: 'text' | 'link'
};

function Property({
  name: className, label, innerText, propertyType = 'text',
}: Props) {
  return (
    <div className={`detail__property detail__property__${className}`}>
      <h3 className="detail__h2">{label}</h3>
      {propertyType === 'text' && <p className="detail__p">{innerText}</p> }
      {propertyType === 'link' && (
        <a className="detail__a" href={innerText} target="_blank" rel="noreferrer">
          &#128279;
          {innerText}
        </a>
      ) }
    </div>
  );
}

Property.defaultProps = {
  propertyType: 'text',
};

export default Property;
