import React, { createContext, useContext, useReducer } from 'react';

import { Bucket, Card, Lane } from '../utils/types';
import { gameReducer } from './reducer';

type GameState = {
  buckets: { [key: string]: Bucket };
  lanes: { [key: string]: Lane };
  config: { [key: string]: string };
  loadGame: () => void;
  addItemToBucket: (id: string, item: Card) => void;
  removeItemFromLane: (id: string, item: Card) => void;
  moveCardsBetweenLanes: (data: { source: Card; target: Card }) => void;
  resetRemainCards: () => void;
  resetGame: () => void;
};

const initialState: GameState = {
  buckets: {},
  lanes: {},
  config: {},
  loadGame: () => {},
  addItemToBucket: () => {},
  removeItemFromLane: () => {},
  moveCardsBetweenLanes: () => {},
  resetRemainCards: () => {},
  resetGame: () => {},
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

  const moveCardsBetweenLanes = ({
    source,
    target,
  }: {
    source: Card;
    target: Card;
  }) => {
    const payload = { source, target };
    dispatch({ type: 'move_cards_between_lanes', payload });
  };

  const resetRemainCards = () => {
    dispatch({ type: 'reset_remain_cards' });
  };

  const resetGame = () => {
    dispatch({ type: 'reset_game' });
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        loadGame,
        addItemToBucket,
        removeItemFromLane,
        moveCardsBetweenLanes,
        resetRemainCards,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
