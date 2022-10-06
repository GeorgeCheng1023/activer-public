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
    case 'plus':
      return <IconPlus />;
    case 'minus':
      return <IconMinus />;
    default:
      return null;
  }
}

TagIcon.defaultProps = defaultTagIconProps;

export default TagIcon;
