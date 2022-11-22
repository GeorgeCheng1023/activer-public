import React from 'react';
import ReactStars from 'react-stars';

type Props = {
  onChangeRating?: (newRating: number) => void;
  edit? :boolean;
  value?: number
};

function Star({ onChangeRating, edit, value }:Props) {
  const handleChange = (newRating: number) => {
    if (onChangeRating) { onChangeRating(newRating); }
  };

  return (
    <ReactStars
      count={5}
      edit={edit}
      value={value}
      onChange={handleChange}
    />
  );
}

Star.defaultProps = {
  onChangeRating: undefined,
  edit: false,
  value: 0,
};

export default Star;
