import React from 'react';

import { CardComponent } from './Card';
import { Card } from '../utils/types';

interface Props {
  laneID: string;
  cards: Card[];
}

export const CardList: React.FC<Props> = ({ cards, laneID }) => {
  if (!cards.length) {
    return <CardComponent data={{ empty: true, laneID }} />;
  }

  const [first, ...rest] = cards;

  return (
    <CardComponent data={first}>
      {/*  */}
      {!!rest.length && <CardList cards={rest} laneID={laneID} />}
    </CardComponent>
  );
};
