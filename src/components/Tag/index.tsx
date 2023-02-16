import React from 'react';
import { Link } from 'react-router-dom';
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

export interface TagType extends
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  id: string;
  text: string;
  disabled?: boolean;
  variant?: TagVariantType;
  type?: 'area' | 'location' | 'other';
  icon?: 'minus' | 'plus' | 'move';
  size?: 'sm' | 'lg';
}

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
  type, text, icon, id, size, disabled, variant,
}: TagType) {
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

export function LinkTag({ ...props }: TagType) {
  return (
    <Link
      to={`/search?tags=${props.text}`}
    >
      <Tag {...props} />
    </Link>
  );
}

export default Tag;
