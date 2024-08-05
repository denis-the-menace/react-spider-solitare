import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CardProperties {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly suit: string;
  readonly rank: number;
}
interface CardState {
  zIndex: number;
  faceUp: boolean;
  position: { x: number; y: number };
  isMovable: boolean;
  isMoving: boolean;
}

export type Card = CardProperties & CardState;

interface Zone {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DeckState {
  deck: Card[];
  stock: Card[];
  tableau: Card[];
  foundation: Card[];
  tableauZones: { [key: number]: Zone }; // Define zone properties
  foundationZones: { [key: number]: Zone }; // Define zone properties
}

const suits = ["hearts", "diamonds", "clubs", "spades"];

const generateDeck = (): Card[] => {
  const cards: Card[] = [];

  suits.forEach((suit) => {
    for (let i = 1; i <= 13; i++) {
      cards.push({
        id: `${suit}-${i}`,
        src: `cards/${suit}_${i}.png`,
        alt: `${suit}_${i}`,
        suit,
        rank: i,
        zIndex: 0,
        faceUp: false,
        isMovable: false,
        isMoving: false,
        position: { x: 0, y: 0 },
      });
    }
  });

  return cards;
};

const shuffleDeck = (deck: Card[]): Card[] => {
  return [...deck].sort(() => Math.random() - 0.5);
};

const initialState: DeckState = {
  deck: [],
  stock: [],
  tableau: [],
  foundation: [],
  tableauZones: Array.from({ length: 10 }, (_, index) => ({
    [index]: { x: index, y: 0, width: 1, height: 10 }, // Example positions and sizes
  })).reduce((acc, cur) => ({ ...acc, ...cur }), {}),
  foundationZones: Array.from({ length: 8 }, (_, index) => ({
    [index]: { x: index, y: 0, width: 1, height: 10 }, // Example positions and sizes
  })).reduce((acc, cur) => ({ ...acc, ...cur }), {}),
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    initializeDeck: (state) => {
      const deck = shuffleDeck(generateDeck());
      const tableauCards = deck.slice(0, 10).map((card, index) => ({
        ...card,
        faceUp: index % 7 === 0,
        position: { x: index % 10, y: Math.floor(index / 10) }, // Adjust based on grid layout
      }));

      const stockCards = deck.slice(28).map((card) => ({
        ...card,
        faceUp: false,
        position: { x: 0, y: 0 },
        isMovable: true,
        isMoving: false,
      }));

      state.deck = [...tableauCards, ...stockCards];
      state.stock = stockCards;
      state.tableau = tableauCards;
    },
    updateCardPosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>,
    ) => {
      const { id, position } = action.payload;
      const card = state.deck.find((card) => card.id === id);
      if (card) {
        // Check if the new position is within any valid drop zone
        const isValidPosition =
          Object.values(state.tableauZones).some(
            (zone) =>
              position.x >= zone.x &&
              position.x < zone.x + zone.width &&
              position.y >= zone.y &&
              position.y < zone.y + zone.height,
          ) ||
          Object.values(state.foundationZones).some(
            (zone) =>
              position.x >= zone.x &&
              position.x < zone.x + zone.width &&
              position.y >= zone.y &&
              position.y < zone.y + zone.height,
          );

        if (isValidPosition) {
          card.position = position;
        }
      }
    },
    stackCards: (
      state,
      action: PayloadAction<{ draggedId: string; targetId: string }>,
    ) => {
      const { draggedId, targetId } = action.payload;
      const draggedCard = state.deck.find((card) => card.id === draggedId);
      const targetCard = state.deck.find((card) => card.id === targetId);

      if (draggedCard && targetCard) {
        // Ensure that the target card position is correct
        if (
          draggedCard.position.x === targetCard.position.x &&
          draggedCard.position.y === targetCard.position.y
        ) {
          // Move the dragged card to the target card's position
          draggedCard.position = { ...targetCard.position };
          draggedCard.isMovable = false;
          targetCard.isMovable = true;

          // Ensure the zIndex is updated for stacking
          draggedCard.zIndex = (targetCard.zIndex || 0) + 1;
        }
      }
    },
  },
});

export const { initializeDeck, updateCardPosition, stackCards } =
  cardSlice.actions;
export default cardSlice.reducer;
