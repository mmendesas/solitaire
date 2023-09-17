export type Suit = {
  color: 'black' | 'red';
  value: string;
};

export type Card = {
  suit: Suit;
  value: string;
  flip: boolean;
  color: 'black' | 'red';
};

export type Bucket = {
  id: string;
  suit: string;
  cards: Card[];
  done: boolean;
};
