export const ItemTypes = {
  CARD: "card",
};

const suits = ["hearts", "diamonds", "clubs", "spades"];

export interface CardProps {
  readonly id: string;
  readonly src: string; // Image source for the card
  readonly alt: string; // Alt text for the image
  readonly suit: string; // Hearts, Spades, Diamonds, Clubs
  readonly rank: number; // 1-13 representing Ace to King
}

export interface CardState {
  zIndex: number; // Layer position for overlapping cards
  faceUp: boolean; // Whether the card is face up or face down
  position: { x: number; y: number }; // Position on the board
  isMovable: boolean; // Whether the card can be moved
  isMoving: boolean; // Whether the card is currently being moved
  location: "tableau" | "stock"; // New state to track card location
}

export type Card = CardProps & CardState;
export type CardObserver = (
  cardId: string,
  position: { x: number; y: number }
) => void;

export class Game {
  public cards: Card[] = [];
  private observers: CardObserver[] = []; // List of observers

  constructor() {
    suits.forEach((suit) => {
      for (let i = 1; i <= 13; i++) {
        this.cards.push({
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
          location: "stock", // Default to stock
        });
      }
    });

    // Shuffle the deck
    const shuffledDeck = this.shuffleDeck(this.cards);

    // Select 28 cards for the tableau
    const tableauCards = shuffledDeck.slice(0, 28);

    // Assign random positions in the range of 1-10
    tableauCards.forEach((card, index) => {
      card.position = {
        x: Math.floor(Math.random() * 10) + 1, // Random x from 1 to 10
        y: 2, // All cards in tableau have y = 1
      };
      card.faceUp = true; // Face-up in tableau
      card.isMovable = true; // Movable within the tableau
      card.location = "tableau"; // Mark as in tableau
    });

    // Update the cards list with the tableau configuration
    this.cards = [...tableauCards, ...shuffledDeck.slice(28)];
  }

  private shuffleDeck(deck: Card[]): Card[] {
    return [...deck].sort(() => Math.random() - 0.5);
  }

  public observe(o: CardObserver): () => void {
    this.observers.push(o);

    // Notify with all current card positions to initialize
    this.cards.forEach((card) => {
      o && o(card.id, card.position);
    });

    return () => {
      this.observers = this.observers.filter((observer) => observer !== o);
    };
  }

  public moveCard(cardId: string, toX: number, toY: number): void {
    const card = this.cards.find((c) => c.id === cardId);
    if (!card) return;

    if (!card.isMovable) return; // Only move if the card is movable

    // Update position and zIndex for the moved card
    this.cards = this.cards.map((c) =>
      c.id === cardId
        ? {
            ...c,
            position: { x: toX, y: toY },
            zIndex: c.zIndex + 1, // Bring the card to the front
          }
        : c
    );

    this.emitChange(cardId);
  }

  public canMoveCard(cardId: string, toX: number, toY: number): boolean {
    const card = this.cards.find((c) => c.id === cardId);
    if (!card || !card.isMovable) return false;

    // Implement Solitaire-specific move logic
    const { x, y } = card.position;

    // Example logic for a simple move (should be replaced with actual rules)
    return Math.abs(toX - x) <= 1 && Math.abs(toY - y) <= 1;
  }

  private emitChange(cardId: string): void {
    const card = this.cards.find((c) => c.id === cardId);
    if (card) {
      this.observers.forEach((o) => o && o(cardId, card.position));
    }
  }

  public getCards(): Card[] {
    return this.cards;
  }
}
