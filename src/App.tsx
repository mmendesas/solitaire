import { useState } from 'react';
import './App.css';

import { Card, CardProps } from './components/Card';
import { setupBuckets, suits } from './utils';
import { CardList } from './components/CardList';
import { BucketBox } from './components/BucketBox';
import { Bucket } from './utils/types';

const cards: CardProps[] = suits.map((suit, idx) => ({
  suit,
  value: `${idx + 1}`,
  color: 'black',
  flip: true,
}));

const buckets = setupBuckets();

function App() {
  const [list] = useState(cards);
  const [current, setCurrent] = useState(cards[0]);

  return (
    <div className="center">
      <main>
        <section className="header">
          <div>source box</div>
          <div className="bucket-container">
            {Object.values(buckets).map(
              (bucket: Bucket): JSX.Element => (
                <BucketBox bucket={bucket} />
              )
            )}
          </div>
        </section>
        <section className="content">
          <Card {...current} />

          <CardList cards={list} />
          <CardList cards={[]} />
        </section>
      </main>
    </div>
  );
}

export default App;
