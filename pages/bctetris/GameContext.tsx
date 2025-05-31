import React, { createContext } from "react";

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  return (
    <GameContext.Provider value={{}}>
      {children}
    </GameContext.Provider>
  )
}