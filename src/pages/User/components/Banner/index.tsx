import React from 'react';
import './index.scss';

type Props = {
  text: string;
};

function Banner({ text }: Props) {
  return (
    <div className="banner__container">
      <h1 className="banner__h1">{text}</h1>
    </div>
  );
}

export default Banner;
