import { v4 as uuidv4 } from 'uuid';

import { Bucket } from './types';

export const suits = ['♥', '◆', '♠', '♣'];
export const baseDeck = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

export function setupBuckets() {
  const buckets: { [key: string]: Bucket } = {};

  suits.forEach((suit: string): void => {
    const id = uuidv4();

    buckets[id] = {
      id,
      suit: suit,
      cards: [],
      done: false,
    };
  });

  return buckets;
}
