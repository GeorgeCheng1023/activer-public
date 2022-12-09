import React from 'react';
import Linkify from 'linkify-react';
import './index.scss';

type Props = {
  sources: string[] | null;
  id: number,
  holder: string[] | null
};

const options = {
  target: '_blank',
  className: 'detail__a',
};

function DetailSources({ sources, id, holder }: Props) {
  if (sources) {
    return (
      <div className="detail__source">
        <h2>原始來源</h2>
        <p>
          {holder ? `${holder[0]}:\n` : null}
          {sources.map((s: any, index: number) => (
            <Linkify
              as="p"
              options={options}
              key={`source-${id}-${index}`}
            >
              {s}
            </Linkify>
          ))}
        </p>
      </div>
    );
  }
  return null;
}

export default DetailSources;
