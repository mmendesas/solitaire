import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { Bucket, Card } from '../utils/types';
import { ItemTypes } from '../utils/constants';
import './BucketBox.css';
import { useGame } from '../context/GameContext';
import { CardComponent } from './Card';
import { baseDeck } from '../utils';

type BucketBoxProps = {
  bucket: Bucket;
};

export const BucketBox: React.FC<BucketBoxProps> = ({ bucket }) => {
  const { buckets, addItemToBucket } = useGame();
  const { cards } = buckets[bucket.id];

  const lastItem = cards.slice(-1)[0];

  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: ItemTypes.CARD,
    canDrop: (item: Card) => {
      const sameSuit = bucket.suit.value === item.suit?.value;
      const correctOrder = baseDeck[cards.length] === item.value;

      return sameSuit && correctOrder;
    },
    drop: (item) => {
      addItemToBucket(bucket.id, item);

      return { action: 'drop-to-bucket', item };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const containerStyle = useMemo(
    () => ({
      opacity: !isOver ? 1 : 0.8,
      backgroundColor: canDrop ? 'rgba(0,200,0,0.4)' : 'rgba(0,0,0, 0.1)',
    }),
    [isOver, canDrop]
  );

  return (
    <div ref={dropRef} className="bucket-box" style={containerStyle}>
      <div className="bucket-content">{bucket.suit.value}</div>
      {!!cards.length && (
        <div className="bucket-top-item">
          <CardComponent data={lastItem} />
        </div>
      )}
    </div>
  );
};
