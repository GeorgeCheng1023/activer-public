import React from 'react';
import './index.scss';

type TagTextProps = {
  text: string;
};

function TagText(props: TagTextProps) {
  const { text } = props;
  return (
    <p className="tag__text">
      {text}
    </p>
  );
}

export default TagText;
