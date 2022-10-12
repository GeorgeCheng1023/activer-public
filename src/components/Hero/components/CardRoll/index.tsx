import React from 'react';
import './index.scss';

type Props = {
  cardList: Array<any>
};

function CardRoll({ cardList }: Props) {
  // const pivotCardIndex = 0;
  return (
    <div>
      {cardList.map((item) => item)}
    </div>
  );
}

export default CardRoll;
