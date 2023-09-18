import React, { createContext, useContext, useReducer } from 'react';

import { Bucket, Lane } from '../utils/types';
import { gameReducer } from './reducer';

type GameState = {
  buckets: { [key: string]: Bucket };
  lanes: { [key: string]: Lane };
  loadGame: () => void;
};

const initialState: GameState = {
  buckets: {},
  lanes: {},
  loadGame: () => {},
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

  return (
    <GameContext.Provider
      value={{
        ...state,
        loadGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
