import React from 'react';
import './index.scss';

// components
import { Link } from 'react-router-dom';
import { IconQuestionCircle } from '../Icons';

type FAQTagProps = {
  title: string;
  dataMsg?: string;
  url?: string;
};

function FAQTag({ title, dataMsg, url }: FAQTagProps) {
  function renderFAQTag() {
    return (
      <div className={dataMsg ? 'FAQtag-msg' : 'FAQtag'} data-msg={dataMsg}>
        <span className={dataMsg ? 'FAQtag-msg__icon' : 'FAQtag__icon'}>
          <IconQuestionCircle />
        </span>
        <div className={dataMsg ? 'FAQtag-msg__title' : 'FAQtag__title'}>
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
  dataMsg: undefined,
};

export default FAQTag;
