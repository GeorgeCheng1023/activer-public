import React from 'react';
import './index.scss';
import { IconMove, IconPlus, IconMinus } from '../Icons';

function TagIcon(icon: TagType['icon']) {
  switch (icon) {
    case 'move':
      return <IconMove />;
    case 'plus':
      return <IconPlus />;
    case 'minus':
      return <IconMinus />;
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
      {TagIcon(icon)}
    </div>
  );
}

export default Tag;
