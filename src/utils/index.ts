import { v4 as uuidv4 } from 'uuid';

import { Bucket, Card, Lane } from './types';

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

export function setupLanes() {
  const lanes: { [key: string]: Lane } = {};

  const cards: Card[] = Array.from({ length: 4 }).map((_, idx) => ({
    suit: suits[0],
    value: baseDeck[idx],
    flip: true,
    color: 'red',
  }));

  Array.from({ length: 7 }).forEach((_, idx) => {
    const id = uuidv4();

    lanes[id] = {
      id,
      name: `lane-0${idx}`,
      cards: cards,
    };
  });

  return lanes;
}
