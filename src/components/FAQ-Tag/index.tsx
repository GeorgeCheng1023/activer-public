import React from 'react';
import './index.scss';

// components
import { Link } from 'react-router-dom';
import { IconQuestionCircle } from '../Icons';

type FAQTagProps = {
  title: string;
  dataMsg: string;
  url?: string;
};

function FAQTag({ title, dataMsg, url }: FAQTagProps) {
  function renderFAQTag() {
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

  if (url) {
    return (
      <Link to={url}>
        {renderFAQTag()}
      </Link>
    );
  }
  return renderFAQTag();
}

FAQTag.defaultProps = {
  url: undefined,
};

export default FAQTag;
