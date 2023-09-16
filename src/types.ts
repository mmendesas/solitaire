export type Card = {
  suit: string;
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
