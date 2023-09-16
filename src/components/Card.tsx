import './Card.css';

import { suits } from '../utils';

export const Card = () => {
  const suit = suits[0];

  return (
    <div className="card" style={{ color: 'red' }}>
      <div className="card__content">
        <div className="card__header">
          <span>A</span>
          <span>{suit}</span>
        </div>
        <div className="card__body">
          <span className="icon">{suit}</span>
        </div>
      </div>
    </div>
  );
};
