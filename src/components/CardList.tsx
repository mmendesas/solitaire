import React from 'react';

import { CardComp } from './Card';
import { Card } from '../utils/types';

interface Props {
  cards: Card[];
}

export const CardList: React.FC<Props> = ({ cards }) => {
  if (!cards.length) return <CardComp empty />;

  const [first, ...rest] = cards;

  return (
    <CardComp {...first}>
      {/*  */}
      {!!rest.length && <CardList cards={rest} />}
    </CardComp>
  );
};
