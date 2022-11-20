import React from 'react';
import './index.scss';
import {
  BsArrowsMove, BsPlus,
} from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';

export type TagType = {
  id: string;
  text: string;
  disabled?: boolean;
  variant?: 'area' | 'location' | 'other';
  icon?: 'minus' | 'plus' | 'move';
  size?: 'sm' | 'lg';
  onClick?: (clickedTag: TagType) => void;
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

const getColor = (variant: TagType['variant']) : string => {
  switch (variant) {
    case 'area': return 'primary';
    case 'location': return 'secondary';
    case 'other': return 'success';
    default: return 'primary';
  }
};

function Tag({
  variant, text, icon, id, size, onClick, disabled,
}: TagType) {
  const handleClick:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (onClick) { onClick({ variant, text, id }); }
  };

  return (
    <button
      type="button"
      className={`
      tag 
      tag--${getColor(variant)}  
      ${size ? `tag--${size}` : ''}
      `}
      id={id}
      onClick={handleClick}
      disabled={disabled}
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

Tag.defaultProps = {
  variant: 'area',
  icon: undefined,
  size: undefined,
  onClick: undefined,
  disabled: false,
};

export default Tag;
