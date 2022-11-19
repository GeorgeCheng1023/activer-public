import React from 'react';
import './index.scss';
import {
  BsArrowsMove, BsPlus,
} from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';

export type TagType = {
  id: string;
  text: string;
  variant?: 'area' | 'location' | 'other';
  icon?: 'minus' | 'plus' | 'move';
  size?: 'sm' | 'lg';
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
  variant, text, icon, id, onClick, size,
}: TagNoLinkProps) {
  const clickData = {
    variant, text, icon, id,
  };

  let color;
  if (variant === 'area') color = 'primary';
  if (variant === 'location') color = 'secondary';
  if (variant === 'other') color = 'success';
  return (
    <button
      type="button"
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onClick={(e) => onClick(clickData)}
      className={`
        tag 
        tag--${color}  
        ${size ? `tag--${size}` : ''}`}
      id={id}
    >
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

TagNoLink.defaultProps = {
  variant: 'area',
  icon: undefined,
  size: undefined,
};

function Tag({
  variant, text, icon, id, size,
}: TagType) {
  let color;
  if (variant === 'area') color = 'primary';
  if (variant === 'location') color = 'secondary';
  if (variant === 'other') color = 'success';
  return (
    <div
      className={`
      tag 
      tag--${color} 
      ${size ? `tag--${size}` : ''}
      `}
      id={id}
    >
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
  variant: 'area',
  icon: undefined,
  size: undefined,
};

export default Tag;
