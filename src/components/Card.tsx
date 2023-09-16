import './Card.css';

interface Props {
  suit: string;
  value: string;
  color?: string;
  flip?: boolean;
}

export const Card: React.FC<Props> = ({ suit, value, flip, color = 'red' }) => {
  return (
    <div className="card" style={{ color }}>
      {flip ? (
        <div className="card--flipped" />
      ) : (
        <div className="card__content">
          <div className="card__header">
            <span>{value}</span>
            <span>{suit}</span>
          </div>
          <div className="card__body">
            <span className="icon">{suit}</span>
          </div>
        </div>
      )}
    </div>
  );
};
