import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const cardWidth = 144;

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
  tableauZones: { [key: number]: Zone };
  foundationZones: { [key: number]: Zone };
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
    [index]: {
      x: index * cardWidth,
      y: 0,
      width: cardWidth,
      height: 1000, // Arbitrary large height for stacking
    },
  })).reduce((acc, cur) => ({ ...acc, ...cur }), {}),
  foundationZones: Array.from({ length: 8 }, (_, index) => ({
    [index]: {
      x: index * cardWidth,
      y: 0,
      width: cardWidth,
      height: 1000,
    },
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
        zIndex: 50,
        faceUp: index % 7 === 0,
        position: { x: index + 1, y: 2 },
      }));

      const stockCards = deck.slice(28).map((card) => ({
        ...card,
        faceUp: false,
        position: { x: 1, y: 1 },
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
      console.log(id, position);
      const card = state.deck.find((card) => card.id === id);
      if (card) {
        card.position = position;
        console.log(JSON.stringify(state.deck.find((card) => card.id === id)));
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
        // Stack the dragged card on top of the target card
        draggedCard.position = {
          ...targetCard.position,
          y: targetCard.position.y + 30, // Stack cards with offset
        };
        draggedCard.zIndex = targetCard.zIndex + 1;

        // Make the dragged card immovable if needed
        draggedCard.isMovable = true;
        targetCard.isMovable = true;
      }
    },
  },
});

export const { initializeDeck, updateCardPosition, stackCards } =
  cardSlice.actions;
export default cardSlice.reducer;
