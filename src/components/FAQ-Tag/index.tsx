import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

// components
import { IconQuestionCircle } from '../Icons';

type FAQTagProps = {
  title: string;
  dataMsg: string;
  url: string;
};

function FAQTag({ title, dataMsg, url }: FAQTagProps) {
  return (
    <Link to={url} type="button" className="FAQtag" data-msg={dataMsg}>
      <span className="FAQtag__icon">
        <IconQuestionCircle />
      </span>
      <div className="FAQtag__title">
        <p>{title}</p>
      </div>
    </Link>
  );
}

export default FAQTag;
