import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CardData {  // Export CardData if you need it in other files
  id: string;
  src: string;
  alt: string;
  position: { x: number; y: number };
}

export interface CardState {  // Explicitly export CardState
  cards: CardData[];
}

const initialState: CardState = {
  cards: Array.from({ length: 10 }).map((_, index) => ({
    id: `card-${index}`,
    src: `cards/hearts_${(index % 13) + 2}.png`,
    alt: `Card ${index + 1}`,
    position: { x: index * 120, y: 0 },
  })),
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    updateCardPosition: (state, action: PayloadAction<{ id: string; position: { x: number; y: number } }>) => {
      const { id, position } = action.payload;
      const card = state.cards.find(card => card.id === id);
      if (card) {
        card.position = position;
      }
    },
    stackCards: (state, action: PayloadAction<{ draggedId: string; targetId: string }>) => {
      const { draggedId, targetId } = action.payload;
      const draggedCard = state.cards.find(card => card.id === draggedId);
      const targetCard = state.cards.find(card => card.id === targetId);
      if (draggedCard && targetCard) {
        draggedCard.position = targetCard.position;
        // Optionally, reorder the cards array to reflect stacking
        state.cards = state.cards.filter(card => card.id !== draggedId).concat(draggedCard);
      }
    },
  },
});

export const { updateCardPosition, stackCards } = cardSlice.actions;
export default cardSlice.reducer;
