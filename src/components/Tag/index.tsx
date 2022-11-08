import React from 'react';
import './index.scss';
import {
  BsArrowsMove, BsPlus,
} from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';

export type TagType = {
  id: string;
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

interface TagNoLinkProps extends TagType {
  onClick: (clickTag: TagType) => void
}

export function TagNoLink({
  color, text, icon, id, onClick,
}: TagNoLinkProps) {
  const clickData = {
    color, text, icon, id,
  };
  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    <button type="button" onClick={(e) => onClick(clickData)} className={`tag tag--${color}`} id={id}>
      <p className="tag__text">
        {text}
      </p>
      {icon && (
        <div className="tag tag__icon">
          {TagIcon(icon)}
        </div>
      ) }

    </button>
  );
}

function Tag({
  color, text, icon, id,
}: TagType) {
  return (
    <div className={`tag tag--${color}`} id={id}>
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
