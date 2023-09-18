import { useDrag } from 'react-dnd';

import './Card.css';
import { ItemTypes } from '../utils/constants';
import { useMemo } from 'react';
import { Card } from '../utils/types';

export interface Props {
  children?: React.ReactNode;
}

type CardProps = Card & Props;

export const CardComp: React.FC<CardProps> = ({
  suit,
  value,
  flip,
  empty,
  color = 'red',
  children,
}) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { card: 'info', test: 123 },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const containerStyle = useMemo(
    () => ({
      opacity: isDragging ? 0 : 1,
      cursor: 'pointer',
      color,
    }),
    [isDragging, color]
  );

  return (
    <div ref={dragRef} className="card" style={containerStyle}>
      {empty && <div className="card--empty" />}
      {!empty && (
        <>
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
        </>
      )}
      {children && <div className="card-child">{children}</div>}
    </div>
  );
};
