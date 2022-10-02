import React from 'react';
import { IconMove, IconPlus, IconMinus } from '../../Icons';

type TagIconProps = {
  icon?: string;
};

const defaultTagIconProps = {
  icon: null,

};

function TagIcon(props: TagIconProps) {
  const { icon } = props;

  switch (icon) {
    case 'move':
      return <IconMove />;
      break;
    case 'plus':
      return <IconPlus />;
      break;
    case 'minus':
      return <IconMinus />;
      break;
    default:
      return null;
  }
}

TagIcon.defaultProps = defaultTagIconProps;

export default TagIcon;
