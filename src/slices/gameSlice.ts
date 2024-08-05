import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameState {
  paused: boolean;

}

const initialState: GameState = {
  deck: [],
  isInitialized: false
};


function shuffleDeck(deck: CardData[]): CardData[] {
  return [...deck].sort(() => Math.random() - 0.5);
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initializeGame: (state) => {
      const deck = shuffleDeck(generateDeck());
      
      // Distribute cards to tableau
      const tableauCards = deck.slice(0, 28).map((card, index) => ({
        ...card,
        position: { x: (index % 7) * 120, y: Math.floor(index / 7) * 30 },
        faceUp: index % 7 === 0 // Face up the top card of each pile
      }));

      // Remaining cards go to stock
      const stockCards = deck.slice(28).map(card => ({
        ...card,
        position: { x: 0, y: 0 },
        faceUp: false
      }));

      state.deck = [...tableauCards, ...stockCards];
      state.isInitialized = true;
    },
  },
});

export const { initializeGame } = gameSlice.actions;
export default gameSlice.reducer;
