import { v4 as uuidv4 } from 'uuid';

import { Bucket, Card, Lane, Suit } from './types';

export const baseSuits = ['♥', '◆', '♠', '♣'];
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

export const suits: Suit[] = [
  { value: '♥', color: 'red' },
  { value: '◆', color: 'red' },
  { value: '♠', color: 'black' },
  { value: '♣', color: 'black' },
];

export function setupBuckets() {
  const buckets: { [key: string]: Bucket } = {};

  suits.forEach((suit: Suit): void => {
    const id = uuidv4();

    buckets[id] = {
      id,
      suit,
      cards: [],
      done: false,
    };
  });

  return buckets;
}

export function buildDeck(): Card[] {
  const fullDeck = [];

  for (const suit of suits) {
    const cardsBySuit = baseDeck.map((value) => ({
      suit: suit,
      value,
      flip: false,
    }));

    fullDeck.push(...cardsBySuit);
  }

  return fullDeck;
}

export function setupLanes() {
  const lanes: { [key: string]: Lane } = {};
  const deck = buildDeck();

  Array.from({ length: 7 }).forEach((_, idx) => {
    const id = uuidv4();
    const itemsByLane = idx + 1;
    const chunk = deck.splice(0, itemsByLane);

    lanes[id] = {
      id,
      name: `lane-0${idx}`,
      cards: chunk.map((card) => ({
        ...card,
        laneID: id,
      })),
    };
  });

  return lanes;
}
