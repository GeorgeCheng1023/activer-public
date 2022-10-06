import React from 'react';
import './index.scss';
import { IconMove, IconPlus, IconMinus } from '../../Icons';

type TagIconProps = {
  tagIcon: string;
};

function TagIcon({ tagIcon }: TagIconProps) {
  switch (tagIcon) {
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

export default TagIcon;
