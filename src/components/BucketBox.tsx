import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { Bucket } from '../utils/types';
import { ItemTypes } from '../utils/constants';
import './BucketBox.css';
import { useGame } from '../context/GameContext';
import { CardComponent } from './Card';

type BucketBoxProps = {
  bucket: Bucket;
};

export const BucketBox: React.FC<BucketBoxProps> = ({ bucket }) => {
  const { buckets, addItemToBucket } = useGame();
  const { cards } = buckets[bucket.id];

  const lastItem = cards.slice(-1)[0];

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes.CARD,
    canDrop: (item: any) => {
      const sameSuit = bucket.suit.value === item.suit.value;
      return sameSuit;
    },
    drop: (item) => {
      console.log('bucket >> drop action', item);
      addItemToBucket(bucket.id, item);

      return { action: 'drop-to-bucket', item };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const containerStyle = useMemo(
    () => ({
      opacity: !isOver ? 1 : 0.8,
    }),
    [isOver]
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
