import React from 'react';
import './index.scss';
import {
  BsArrowsMove, BsPlus,
} from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import { motion } from 'framer-motion';
import classNames from 'classnames';

interface TagVariantType {
  reverse?: boolean;
}

export type TagType = {
  id: string;
  text: string;
  disabled?: boolean;
  variant?: TagVariantType;
  type?: 'area' | 'location' | 'other';
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

const getColor = (type: TagType['type']) : string => {
  switch (type) {
    case 'area': return 'primary';
    case 'location': return 'secondary';
    case 'other': return 'success';
    default: return 'primary';
  }
};

function Tag({
  type, text, icon, id, size, onClick, disabled, variant,
}: TagType) {
  const handleClick:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (onClick) { onClick({ type, text, id }); }
  };

  const tagClasses = classNames({
    tag: true,
    [`tag--${getColor(type)}`]: true,
    [`tag--${size}`]: size,
    'tag--reverse': variant?.reverse,
  });

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      type="button"
      className={tagClasses}
      id={id.toString()}
      onClick={handleClick}
      disabled={disabled}
    >
      <p className="tag__text">
        #
        {' '}
        {text}
      </p>
      {icon && (
        <div className="tag__icon">
          {TagIcon(icon)}
        </div>
      ) }
    </motion.button>
  );
}

Tag.defaultProps = {
  type: 'area',
  icon: undefined,
  size: undefined,
  onClick: undefined,
  disabled: false,
  variant: undefined,
};

export default Tag;
