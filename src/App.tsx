import { useEffect } from 'react';
import './App.css';

import { CardList } from './components/CardList';
import { BucketBox } from './components/BucketBox';
import { Bucket } from './utils/types';
import { useGame } from './context/GameContext';

function App() {
  const { buckets, lanes, loadGame } = useGame();

  useEffect(() => {
    loadGame();
  }, []);

  console.log(lanes);

  return (
    <div className="center">
      <main>
        <section className="header">
          <div>source box</div>
          <div className="bucket-container">
            {Object.values(buckets).map(
              (bucket: Bucket): JSX.Element => (
                <BucketBox key={bucket.id} bucket={bucket} />
              )
            )}
          </div>
        </section>
        <section className="content">
          {Object.entries(lanes).map(([id, lane]): JSX.Element => {
            return <CardList key={id} cards={lane.cards} />;
          })}
        </section>
      </main>
    </div>
  );
}

export default App;
