import React from 'react';

type Props = {
  sources: string[] | null;
  id: number
};

function DetailSources({ sources, id }: Props) {
  if (sources) {
    return (
      <>
        {sources.map((s: any, index: number) => (
          <a
            className="detail__a"
            href={s}
            key={`source-${id}-${index}`}
          >
            {s}
          </a>
        ))}

      </>
    );
  }
  return null;
}

export default DetailSources;
