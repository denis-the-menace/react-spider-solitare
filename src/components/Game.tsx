// observer pattern ile state değişikliklerini dinleyen observerları tetikleyebiliriz
// boylece state değişikliklerini componentlere bildirebiliriz
// emitChange ile observerları tetikliyoruz

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
  faceUp: boolean; // Whether the card is face up or face down
  position: { x: number; y: number; z: number }; // Position on the board
  location: "tableau" | "stock" | "foundation"; // New state to track card location
}

export type Card = CardProps & CardState;
export type CardObserver = (
  cardId: string,
  position: { x: number; y: number; z: number },
  faceUp: boolean,
  location: "tableau" | "stock" | "foundation",
) => void;

export class Game {
  public cards: Card[] = [];
  private observers: CardObserver[] = []; // List of observers

  constructor() {
    const generateDeck = (deckNo: number) => {
      suits.forEach((suit) => {
        for (let i = 1; i <= 13; i++) {
          this.cards.push({
            id: `${suit}-${i}-${deckNo}`,
            src: `cards/${suit}_${i}.png`,
            alt: `${suit}_${i}`,
            suit,
            rank: i,
            faceUp: false,
            position: { x: 0, y: 0, z: 0 },
            location: "stock",
          });
        }
      });
    };

    for (let i = 1; i <= 2; i++) {
      generateDeck(i);
    }

    const shuffledDeck = this.shuffleDeck(this.cards);

    const tableauCards = shuffledDeck.slice(0, 54);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 6; j++) {
        const cardIndex = i * 6 + j;
        tableauCards[cardIndex].position = {
          x: i,
          y: 1,
          z: j,
        };
        tableauCards[cardIndex].location = "tableau";

        if (j === 5) tableauCards[cardIndex].faceUp = true;
      }
    }

    for (let i = 4; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        const cardIndex = 24 + (i - 4) * 5 + j;
        tableauCards[cardIndex].position = {
          x: i,
          y: 1,
          z: j,
        };
        tableauCards[cardIndex].location = "tableau";

        if (j === 4) tableauCards[cardIndex].faceUp = true;
      }
    }

    this.cards = [...tableauCards, ...shuffledDeck.slice(54)];
  }

  private shuffleDeck(deck: Card[]): Card[] {
    return [...deck].sort(() => Math.random() - 0.5);
  }

  public observe(o: CardObserver): () => void {
    this.observers.push(o);

    // Notify with all current card positions to initialize
    this.cards.forEach((card) => {
      o && o(card.id, card.position, card.faceUp, card.location);
    });

    return () => {
      this.observers = this.observers.filter((observer) => observer !== o);
    };
  }

  private emitChange(cardId: string): void {
    const card = this.cards.find((c) => c.id === cardId);
    if (card) {
      this.observers.forEach(
        (o) => o && o(cardId, card.position, card.faceUp, card.location),
      );
    }
  }

  public moveCard(cardId: string, toX: number, toY: number): void {
    const card = this.cards.find((c) => c.id === cardId);
    if (!card || !card.faceUp) return;

    const isNotTopCard = this.cards.some(
      (c) =>
        c.position.x === card.position.x &&
        c.position.y === card.position.y &&
        c.position.z === card.position.z + 1,
    );

    if (isNotTopCard) {
      this.moveStack(cardId, toX, toY);
    } else {
      // move ettigimiz stack'in en ustteki karti
      const topCardZ = this.cards
        .filter((c) => c.position.x === toX && c.position.y === toY)
        .reduce((maxZ, c) => (c.position.z > maxZ ? c.position.z : maxZ), 0);

      const newTopCard = this.cards.find(
        (c) =>
          c.position.x === card.position.x &&
          c.position.y === card.position.y &&
          c.position.z === card.position.z - 1,
      );

      if (newTopCard) {
        this.cards = this.cards.map((c) =>
          c.id === newTopCard.id
            ? {
                ...c,
                faceUp: true,
              }
            : c,
        );
        this.emitChange(newTopCard.id);
      }

      this.cards = this.cards.map((c) =>
        c.id === cardId
          ? {
              ...c,
              position: { x: toX, y: toY, z: topCardZ + 1 },
            }
          : c,
      );
    }

    this.emitChange(cardId);
  }

  public moveStack(cardId: string, toX: number, toY: number): void {
    const card = this.cards.find((c) => c.id === cardId);
    if (!card || !card.faceUp) return;

    const cardsToMove = this.cards.filter(
      (c) =>
        c.position.x === card.position.x &&
        c.position.y === card.position.y &&
        c.position.z >= card.position.z,
    );

    const updatedCardsToMove = cardsToMove
      .sort((a, b) => a.position.z - b.position.z)
      .map((c, index) => ({
        ...c,
        position: {
          ...c.position,
          x: toX,
          y: toY,
          z: index, // move ettigimiz stackin ustune koymak icin
        },
      }));

    const topCardZ = this.cards
      .filter((c) => c.position.x === toX && c.position.y === toY)
      .reduce((maxZ, c) => (c.position.z > maxZ ? c.position.z : maxZ), -1);

    const newTopCard = this.cards.find(
      (c) =>
        c.position.x === card.position.x &&
        c.position.y === card.position.y &&
        c.position.z === card.position.z - 1,
    );

    if (newTopCard) {
      this.cards = this.cards.map((c) =>
        c.id === newTopCard.id
          ? {
              ...c,
              faceUp: true,
            }
          : c,
      );
      this.emitChange(newTopCard.id);
    }

    this.cards = this.cards.map((c) => {
      const updatedCard = updatedCardsToMove.find((u) => u.id === c.id);
      if (updatedCard) {
        return {
          ...c,
          position: {
            ...updatedCard.position,
            z: topCardZ + updatedCard.position.z + 1,
          },
        };
      }
      return c;
    });

    updatedCardsToMove.forEach((card) => {
      this.emitChange(card.id);
    });
  }

  public canMoveCard(cardId: string, toX: number, toY: number): boolean {
    const card = this.cards.find((c) => c.id === cardId);
    if (!card || !card.faceUp) return false;

    // Implement Solitaire-specific move logic
    const { x, y } = card.position;

    // Example logic for a simple move (should be replaced with actual rules)
    return Math.abs(toX - x) <= 1 && Math.abs(toY - y) <= 1;
  }

  public getCards(): Card[] {
    return this.cards;
  }
}
