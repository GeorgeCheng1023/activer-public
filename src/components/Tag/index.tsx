import React from 'react';
import './index.scss';
import TagIcon from './TagIcon';

import TagText from './TagText';

type TagProps = {
  text: String;
  color?: String;
  icon?: String;
} & typeof defaultTagProps;

const defaultTagProps = {
  color: 'primary',
  icon: 'none',
};

function Tag(props: TagProps) {
  const { text, icon, color } = props;
  return (
    <div className={`tag bg-${color}`}>
      <TagText text={text} />
      <TagIcon icon={icon} />
    </div>
  );
}

Tag.defaultProps = defaultTagProps;

export default Tag;
