import React from 'react';

interface Props {
  holder: string[] | null
}

function DetailHolder({ holder: holders }:Props) {
  if (holders) {
    return (
      <div>
        <h2>主辦單位</h2>
        {holders.map((holder, index:number) => (
          <p key={`detail-holder-${index}`}>
            {holder}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default DetailHolder;
