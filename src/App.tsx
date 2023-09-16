import { useState } from 'react';
import './App.css';

import { Card, CardProps } from './components/Card';
import { suits } from './utils';
import { CardList } from './components/CardList';
import { BucketBox } from './components/BucketBox';

const cards: CardProps[] = suits.map((suit, idx) => ({
  suit,
  value: `${idx + 1}`,
  color: 'black',
  flip: true,
}));

function App() {
  const [list] = useState(cards);
  const [current, setCurrent] = useState(cards[0]);

  console.log(list.length);

  return (
    <div className="center">
      <BucketBox
        bucket={{
          id: '',
          suit: suits[0],
          cards: [],
          done: false,
        }}
      />

      <Card {...current} />
      <CardList cards={list} />
      <CardList cards={[]} />

      <button
        onClick={() => {
          setCurrent((prev) => ({ ...prev, flip: !prev.flip }));
        }}
      >
        Flip
      </button>
    </div>
  );
}

export default App;
