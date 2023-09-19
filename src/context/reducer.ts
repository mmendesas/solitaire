import { setupBuckets, setupLanes } from '../utils';
import { Card } from '../utils/types';

const actionLoadGame = (state, action) => {
  const buckets = setupBuckets();
  const lanes = setupLanes();

  return {
    ...state,
    buckets,
    lanes,
  };
};

const actionAddToBucket = (state, action) => {
  const { bucketID, item } = action.payload;
  const bucket = state.buckets[bucketID];

  const idx = bucket.cards.findIndex((card: Card) => {
    return card.value === item.value;
  });

  // do not duplicate item
  if (idx === -1) {
    bucket.cards.push({ ...item, laneID: null });
  }

  return { ...state };
};

const actionRemoveItemFromLane = (state, action) => {
  const { item } = action.payload;

  const cards = state.lanes[item.laneID].cards;
  const idx = cards.findIndex((card: Card) => {
    return card.value === item.value && card.suit?.value === item.suit.value;
  });

  state.lanes[item.laneID].cards = cards.slice(0, idx);

  return { ...state };
};

const actionMoveCardsBetweenLanes = (state, action) => {
  console.log('action move cards', action.payload);

  const { source, target } = action.payload;

  // pick items from source list
  const sourceCards = state.lanes[source.laneID].cards;
  const sourceIdx = sourceCards.findIndex((card) => {
    return card.value === source.value && card.suit.value === source.suit.value;
  });

  const cardsToSend = sourceCards.slice(sourceIdx);

  // move itens to target list
  const targetCards = state.lanes[target.laneID].cards;
  cardsToSend.forEach((card) => {
    targetCards.push({ ...card, flip: false, laneID: target.laneID });
  });

  return { ...state };
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'load_game':
      return actionLoadGame(state, action);
    case 'add_to_bucket':
      return actionAddToBucket(state, action);
    case 'remove_item_from_lane':
      return actionRemoveItemFromLane(state, action);
    case 'move_cards_between_lanes':
      return actionMoveCardsBetweenLanes(state, action);
    default:
      return state;
  }
};
