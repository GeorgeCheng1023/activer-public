import React from 'react';
import Linkify from 'linkify-react';

type Props = {
  sources: string[] | null;
  id: number
};

const options = {
  target: '_blank',
  className: 'detail__a',
};

function DetailSources({ sources, id }: Props) {
  if (sources) {
    return (
      <>
        {/* eslint-disable-next-line */}
        {sources.map((s: any, index: number) => (
          <Linkify as="p" options={options} key={`source-${id}-${index}`}>{s}</Linkify>
        ))}

      </>
    );
  }
  return null;
}

export default DetailSources;
