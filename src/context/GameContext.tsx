import React, { createContext, useContext, useReducer } from 'react';

import { Bucket, Card, Lane } from '../utils/types';
import { gameReducer } from './reducer';

type GameState = {
  buckets: { [key: string]: Bucket };
  lanes: { [key: string]: Lane };
  loadGame: () => void;
  addItemToBucket: (id: string, item: Card) => void;
  removeItemFromLane: (id: string, item: Card) => void;
};

const initialState: GameState = {
  buckets: {},
  lanes: {},
  loadGame: () => {},
  addItemToBucket: () => {},
  removeItemFromLane: () => {},
};

const GameContext = createContext<GameState>(initialState);

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used withing a GameProvider');
  }
  return context;
};

type ProviderProps = {
  children: React.ReactNode;
};

export function GameProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const loadGame = async (payload = {}) => {
    dispatch({ type: 'load_game', payload });
  };

  const addItemToBucket = async (bucketID: string, item: Card) => {
    const payload = { bucketID, item };
    dispatch({ type: 'add_to_bucket', payload });
  };

  const removeItemFromLane = async (laneID: string, item: Card) => {
    const payload = { laneID, item };
    dispatch({ type: 'remove_item_from_lane', payload });
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        loadGame,
        addItemToBucket,
        removeItemFromLane,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
