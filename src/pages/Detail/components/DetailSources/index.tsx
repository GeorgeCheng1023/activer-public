import React from 'react';
import Linkify from 'linkify-react';
import './index.scss';

type Props = {
  sources: string[] | null;
  id: number,
};

const options = {
  target: '_blank',
  className: 'detail__a',
};

function DetailSources({ sources, id }: Props) {
  if (sources) {
    return (
      <div className="detail__source">
        <h2>原始來源</h2>

        {sources.map((s: any, index: number) => (
          <Linkify
            as="p"
            options={options}
            key={`source-${id}-${index}`}
          >
            {s}
          </Linkify>
        ))}

      </div>
    );
  }
  return null;
}

export default DetailSources;
