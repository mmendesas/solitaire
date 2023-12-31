import { setupBuckets, setupLanes } from '../utils';
import { Card, Lane } from '../utils/types';

function flipLastItem(lane: Lane) {
  const isBaseLane = lane.name.startsWith('lane');
  if (!isBaseLane) return;

  // flip last item
  const last = lane.cards.length - 1;
  if (last > -1) {
    lane.cards[last].flip = false;
  }
}

const actionLoadGame = (state, action) => {
  const buckets = setupBuckets();
  const lanesAndConfig = setupLanes();

  return {
    ...state,
    ...lanesAndConfig,
    buckets,
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

  flipLastItem(state.lanes[item.laneID]);

  return { ...state };
};

const actionMoveCardsBetweenLanes = (state, action) => {
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

const actionResetRemainCards = (state, action) => {
  const { remainID, nextID } = state.config;

  const seenLane = state.lanes[nextID];
  const remainLane = state.lanes[remainID];

  seenLane.cards.forEach((card: Card) => {
    remainLane.cards.unshift({
      ...card,
      laneID: remainID,
      flip: true,
    });
  });

  seenLane.cards = [];

  return { ...state };
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'load_game':
    case 'reset_game':
      return actionLoadGame(state, action);
    case 'add_to_bucket':
      return actionAddToBucket(state, action);
    case 'remove_item_from_lane':
      return actionRemoveItemFromLane(state, action);
    case 'move_cards_between_lanes':
      return actionMoveCardsBetweenLanes(state, action);
    case 'reset_remain_cards':
      return actionResetRemainCards(state, action);
    default:
      return state;
  }
};
