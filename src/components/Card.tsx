import './Card.css';

export interface CardProps {
  suit: string;
  value: string;
  color?: string;
  flip?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  suit,
  value,
  flip,
  color = 'red',
  children,
}) => {
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
      {children && <div className="card-child">{children}</div>}
    </div>
  );
};
