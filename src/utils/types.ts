export type Suit = {
  color: 'black' | 'red';
  value: string;
};

export type Card = {
  suit?: Suit;
  value?: string;
  flip?: boolean;
  color?: 'black' | 'red';
  empty?: boolean;
};

export type Bucket = {
  id: string;
  suit: string;
  cards: Card[];
  done: boolean;
};

export type Lane = {
  id: string;
  name: string;
  cards: Card[];
};
