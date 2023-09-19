export type Suit = {
  color: 'black' | 'red';
  value: string;
};

export type Card = {
  suit?: Suit;
  value?: string;
  flip?: boolean;
  empty?: boolean;
  laneID?: string;
};

export type Bucket = {
  id: string;
  suit: Suit;
  cards: Card[];
  done: boolean;
};

export type Lane = {
  id: string;
  name: string;
  cards: Card[];
};
