import React from 'react';

import { CardComponent } from './Card';
import { Card } from '../utils/types';

interface Props {
  cards: Card[];
}

export const CardList: React.FC<Props> = ({ cards }) => {
  if (!cards.length) return <CardComponent data={{ empty: true }} />;

  const [first, ...rest] = cards;

  return (
    <CardComponent data={first}>
      {/*  */}
      {!!rest.length && <CardList cards={rest} />}
    </CardComponent>
  );
};
