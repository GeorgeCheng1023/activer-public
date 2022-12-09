import React from 'react';

interface Props {
  connection: string[] | null
}

function DetailComment({ connection: connections }: Props) {
  if (connections) {
    return (
      <div className="detail__connection">
        <h2>聯絡資訊</h2>
        {connections.map((connection: string, index: number) => (
          <p key={`detail-connection-${index}`}>{connection}</p>
        ))}
      </div>
    );
  }

  return null;
}

export default DetailComment;
