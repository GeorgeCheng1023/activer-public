import React from 'react';
import './index.scss';
import {
  BsArrowsMove, BsPlus,
} from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';

function TagIcon(icon: TagType['icon']) {
  switch (icon) {
    case 'move':
      return <BsArrowsMove />;
    case 'plus':
      return <BsPlus />;
    case 'minus':
      return <BiMinus />;
    default:
      return null;
  }
}

function Tag({
  color, text, icon,
}: TagType) {
  return (
    <div className={`tag tag--${color}`}>
      <p className="tag__text">
        {text}
      </p>
      <div className="tag tag__icon">
        {TagIcon(icon)}
      </div>
    </div>
  );
}

export default Tag;
