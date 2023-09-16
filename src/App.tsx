import { useState } from 'react';
import './App.css';

import { Card } from './components/Card';
import { suits } from './utils';

function App() {
  const [current, setCurrent] = useState({
    suit: suits[2],
    value: 'A',
    color: 'red',
    flip: true,
  });

  return (
    <div className="center">
      <Card {...current} />

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
