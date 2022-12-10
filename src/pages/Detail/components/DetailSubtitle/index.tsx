import React from 'react';

interface Props {
  subtitle: string | null
}

function DetailSubtitle({ subtitle }: Props) {
  if (subtitle) {
    return (
      <h3>{subtitle}</h3>
    );
  }
  return null;
}

export default DetailSubtitle;
