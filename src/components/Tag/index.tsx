import React from 'react';
import './index.scss';
import {
  BsArrowsMove, BsPlus,
} from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';

export type TagType = {
  key: string;
  text: string;
  color?: 'primary' | 'secondary' | 'success';
  icon?: 'minus' | 'plus' | 'move';
};

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
  color, text, icon, key,
}: TagType) {
  return (
    <div className={`tag tag--${color}`} key={key}>
      <p className="tag__text">
        {text}
      </p>
      {icon && (
        <div className="tag tag__icon">
          {TagIcon(icon)}
        </div>
      ) }

    </div>
  );
}

Tag.defaultProps = {
  color: 'primary',
  icon: undefined,
};

export default Tag;
