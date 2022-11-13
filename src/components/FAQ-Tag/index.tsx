import React from 'react';
import './index.scss';

// components
import { IconQuestionCircle } from '../Icons';

type FAQTagProps = {
  title: string;
  dataMsg: string;
  url: string;
};

function FAQTag({ title, dataMsg, url }: FAQTagProps) {
  return (
    <div className="FAQtag" data-msg={dataMsg}>
      <span className="FAQtag__icon">
        <IconQuestionCircle />
      </span>
      <div className="FAQtag__title">
        <p>{title}</p>
      </div>
    </div>
  );
}

export default FAQTag;
