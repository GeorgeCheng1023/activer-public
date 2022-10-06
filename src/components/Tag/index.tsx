import React from 'react';
import './index.scss';
import TagIcon from './TagIcon';
import TagText from './TagText';

type TagProps = {
  tagText: string;
  tagColor: string;
  tagIcon: string;
};

export const allTagColor = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
};

function Tag({
  tagColor, tagText, tagIcon,
}: TagProps) {
  return (
    <div className={`tag tag--${tagColor}`}>
      <TagText text={tagText} />
      <TagIcon tagIcon={tagIcon} />
    </div>
  );
}

export default Tag;
