import { useDrop } from 'react-dnd';
import { Bucket } from '../utils/types';

import './BucketBox.css';
import { ItemTypes } from '../utils/constants';
import { useMemo } from 'react';

type BucketBoxProps = {
  bucket: Bucket;
};

export const BucketBox: React.FC<BucketBoxProps> = ({ bucket }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes.CARD,
    canDrop: (item) => {
      console.log('bucket >> can drop', item);
      return true;
    },
    drop: (item) => {
      console.log('bucket >> drop action', item);
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
      <div className="bucket-content">{bucket.suit}</div>
    </div>
  );
};
