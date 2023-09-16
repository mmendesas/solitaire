import { Bucket } from '../types';

import './BucketBox.css';

type BucketBoxProps = {
  bucket: Bucket;
};

export const BucketBox: React.FC<BucketBoxProps> = ({ bucket }) => {
  return (
    <div className="bucket-box">
      <div className="bucket-content">{bucket.suit}</div>
    </div>
  );
};
