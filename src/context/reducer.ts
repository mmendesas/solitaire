import { setupBuckets, setupLanes } from '../utils';

const loadGameAction = (state, action) => {
  const buckets = setupBuckets();
  const lanes = setupLanes();

  return {
    ...state,
    buckets,
    lanes,
  };
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'load_game':
      return loadGameAction(state, action);
    default:
      return state;
  }
};
