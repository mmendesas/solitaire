import { setupBuckets, setupLanes } from '../utils';
import { Card } from '../utils/types';

const loadGameAction = (state, action) => {
  const buckets = setupBuckets();
  const lanes = setupLanes();

  return {
    ...state,
    buckets,
    lanes,
  };
};

const addToBucketAction = (state, action) => {
  console.log('action >>> add to bucket', action.payload);

  const { bucketID, item } = action.payload;
  const bucket = state.buckets[bucketID];
  bucket.cards.push({ ...item, laneID: null });

  return { ...state };
};

const removeItemFromLaneAction = (state, action) => {
  console.log('action >>> remove item', action.payload);

  const { item } = action.payload;

  const cards = state.lanes[item.laneID].cards;
  const idx = cards.findIndex((card: Card) => {
    return card.value === item.value && card.suit?.value === item.suit.value;
  });

  state.lanes[item.laneID].cards = cards.slice(0, idx);

  return { ...state };
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'load_game':
      return loadGameAction(state, action);
    case 'add_to_bucket':
      return addToBucketAction(state, action);
    case 'remove_item_from_lane':
      return removeItemFromLaneAction(state, action);
    default:
      return state;
  }
};
