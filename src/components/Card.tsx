import { useDrag, useDrop } from 'react-dnd';

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

  // handle dragging action
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => {
      if (!data.laneID) return false; // do not move from bucket

      return true;
    },
    end: (item, monitor) => {
      const droppedItem = monitor.getDropResult();
      if (droppedItem) {
        removeItemFromLane(item.laneID as string, item);
      }
    },
  }));

  // handle drop action of item as child of current card
  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: ItemTypes.CARD,
    canDrop: () => {
      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const containerStyle = useMemo(
    () => ({
      opacity: isDragging ? 0 : 1,
      cursor: 'pointer',
    }),
    [isDragging]
  );

  const cardBucketStyle = useMemo(
    () => ({
      backgroundColor:
        isOver && canDrop
          ? 'rgba(0, 200, 200, 0.4)'
          : isOver
          ? 'rgba(0, 0, 0, 0.2)'
          : '',
    }),
    [isOver, canDrop]
  );

  return (
    <div
      ref={dragRef}
      className="card"
      style={{ ...containerStyle, color: suit?.color }}
    >
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
      {!children && (
        <div ref={dropRef} className="card-bucket" style={cardBucketStyle} />
      )}
    </div>
  );
};
