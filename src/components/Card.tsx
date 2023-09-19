import { useDrag } from 'react-dnd';

import './Card.css';
import { ItemTypes } from '../utils/constants';
import { useMemo } from 'react';
import { Card } from '../utils/types';
import { useGame } from '../context/GameContext';

export interface Props {
  data: Card;
  children?: React.ReactNode;
}

export const CardComponent: React.FC<Props> = ({ data, children }) => {
  const { removeItemFromLane } = useGame();

  const { suit, value, flip, empty } = data;
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const droppedItem = monitor.getDropResult();
      if (droppedItem) {
        removeItemFromLane(item.laneID as string, item);
      }
    },
  }));

  const containerStyle = useMemo(
    () => ({
      opacity: isDragging ? 0 : 1,
      cursor: 'pointer',
      color: suit?.color,
    }),
    [isDragging]
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
                <span>{suit?.value}</span>
              </div>
              <div className="card__body">
                <span className="icon">{suit?.value}</span>
              </div>
            </div>
          )}
        </>
      )}
      {children && <div className="card-child">{children}</div>}
    </div>
  );
};
