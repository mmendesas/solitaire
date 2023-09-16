import React from 'react';

import { Card, CardProps } from './Card';

interface Props {
  cards: CardProps[];
}

export const CardList: React.FC<Props> = ({ cards }) => {
  if (!cards.length) return <div>empty card</div>;

  const [first, ...rest] = cards;

  return (
    <Card {...first}>
      {/*  */}
      {!!rest.length && <CardList cards={rest} />}
    </Card>
  );
};
