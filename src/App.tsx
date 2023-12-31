import { useEffect } from 'react';
import './App.css';

import { CardList } from './components/CardList';
import { BucketBox } from './components/BucketBox';
import { SourceBox } from './components/SourceBox';
import { useGame } from './context/GameContext';
import { Bucket } from './utils/types';
import { Clock } from './components/Clock';

function App() {
  const { buckets, lanes, loadGame, resetGame, config } = useGame();

  useEffect(() => {
    loadGame();
  }, []);

  return (
    <div className="center">
      <main>
        <div className="hud">
          <Clock key={config.remainID} />
          <button onClick={resetGame}>Reset</button>
        </div>
        <section className="header">
          <div>
            <SourceBox />
          </div>
          <div className="bucket-container">
            {Object.values(buckets).map(
              (bucket: Bucket): JSX.Element => (
                <BucketBox key={bucket.id} bucket={bucket} />
              )
            )}
          </div>
        </section>
        <section className="content">
          {Object.entries(lanes).map(([id, lane]): JSX.Element | undefined => {
            const baseLanes = lane.name.startsWith('lane');
            if (!baseLanes) return undefined;

            return <CardList key={id} laneID={id} cards={lane.cards} />;
          })}
        </section>
      </main>
    </div>
  );
}

export default App;
