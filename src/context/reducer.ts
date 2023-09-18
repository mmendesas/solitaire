import { setupBuckets } from '../utils';

const loadGameAction = (state, action) => {
  const buckets = setupBuckets();
  return {
    ...state,
    buckets,
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
