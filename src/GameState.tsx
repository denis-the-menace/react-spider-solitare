// observer pattern ile state değişikliklerini dinleyen observerları tetikleyebiliriz
// boylece state değişikliklerini componentlere bildirebiliriz
// emitChange ile observerları tetikliyoruz

export const ItemTypes = {
  CARD: "card",
};

export interface CardProps {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly suit: string;
  readonly rank: number;
}

export interface CardState {
  faceUp: boolean;
  position: { x: number; y: number; z: number };
}

export type Card = CardProps & CardState;

export type CardObserver = (
  cardId: string,
  position: { x: number; y: number; z: number },
  faceUp: boolean,
) => void;

export class GameState {
  public cards: Card[] = [];
  private observers: CardObserver[] = [];
  private foundationsCompleted: number = 0;
  private history: Card[][] = [];

  public newGame(): void {
    this.history = [];
  }

  constructor(suitsToUse: number) {
    let suits: string[] = [];
    if (suitsToUse === 1) suits = ["spades", "spades", "spades", "spades"];
    else if (suitsToUse === 2) suits = ["spades", "hearts", "spades", "hearts"];
    else if (suitsToUse === 4)
      suits = ["spades", "hearts", "clubs", "diamonds"];

    const generateDeck = (deckNo: number) => {
      suits.forEach((suit, index) => {
        for (let i = 1; i <= 13; i++) {
          this.cards.push({
            id: `${suit}-${i}-${deckNo}${index}`,
            src: `cards/${suit}_${i}.png`,
            alt: `${suit}_${i}`,
            suit,
            rank: i,
            faceUp: false,
            position: { x: 0, y: 0, z: 0 },
          });
        }
      });
    };

    for (let i = 0; i < 2; i++) {
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

        if (j === 4) tableauCards[cardIndex].faceUp = true;
      }
    }

    const stock = shuffledDeck.slice(54);
    stock.forEach((card) => {
      card.position = { x: 0, y: 0, z: 0 };
      card.faceUp = false;
    });

    this.cards = [...tableauCards, ...stock];
  }

  private shuffleDeck(deck: Card[]): Card[] {
    return [...deck].sort(() => Math.random() - 0.5);
  }

  public observe(o: CardObserver): () => void {
    this.observers.push(o);

    this.cards.forEach((card) => {
      o && o(card.id, card.position, card.faceUp);
    });

    return () => {
      this.observers = this.observers.filter((observer) => observer !== o);
    };
  }

  private emitChange(cardId: string): void {
    const card = this.cards.find((c) => c.id === cardId);
    if (card) {
      this.observers.forEach((o) => o && o(cardId, card.position, card.faceUp));
    }
  }

  public emitChangeForAll(cardIds: string[]): void {
    cardIds.forEach((cardId) => this.emitChange(cardId));
    console.log(cardIds);
    this.saveState();
  }

  private saveState() {
    this.history.push(JSON.parse(JSON.stringify(this.cards)));
    console.log(this.history);
  }

  public undo(): boolean {
    if (this.history.length === 0) {
      return false;
    }

    this.cards = this.history.pop()!;
    this.cards.forEach((card) => this.emitChange(card.id));
    return true;
  }

  private canMoveCard(card: Card, toX: number, toY: number): boolean {
    // eger dragledigimiz yer tableau ve bossa return true
    // eger dragledigimiz card'in ranki targetCard'inkinden 1 buyuk degilse return false

    const hasCardInArea = this.cards.some(
      (c) => c.position.x === toX && c.position.y === toY,
    );

    if (!hasCardInArea) return true;

    const targetCard = this.cards
      .filter((c) => c.position.x === toX && c.position.y === toY)
      .reduce((maxCard, c) =>
        c.position.z > maxCard.position.z ? c : maxCard,
      );

    if (card.rank !== targetCard.rank - 1) return false;

    return true;
  }

  private canMoveStack(cards: Card[]): boolean {
    // canMoveCard check ettikten sonra:
    // eger stackteki tum cardlarin suiti ayni degilse return false
    // eger cardlar ardisik olarak azalmiyorsa return false

    const isSameSuit = cards.every((card) => card.suit === cards[0].suit);
    if (!isSameSuit) return false;

    const isSequential = cards.every(
      (card, index) =>
        index === 0 || card.rank === cards[index - 1].rank + 1,
    );
    if(!isSequential) return false;

    return true;
  }

  public moveCard(cardId: string, toX: number, toY: number): void {
    const card = this.cards.find((c) => c.id === cardId);
    if (!card || !card.faceUp || !this.canMoveCard(card, toX, toY)) return;

    if (card.position.x === toX && card.position.y === toY) return;

    // move ettigimiz stack'in en ustteki karti
    const targetCardZ = this.cards
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

    this.cards = this.cards.map((c) =>
      c.id === cardId
        ? {
            ...c,
            position: { x: toX, y: toY, z: targetCardZ + 1 },
          }
        : c,
    );

    this.emitChange(cardId);

    const stack = this.cards.filter(
      (c) => c.position.x === toX && c.position.y === toY && c.faceUp,
    );

    const isStackComplete = this.checkStackComplete(stack);

    if (isStackComplete) {
      const cardBelowStack = this.cards.find(
        (c) =>
          c.position.x === toX &&
          c.position.y === toY &&
          c.position.z === card.position.z - 1,
      );
      console.log(cardBelowStack);

      if (cardBelowStack) {
        this.cards = this.cards.map((c) =>
          c.id === cardBelowStack.id
            ? {
                ...c,
                faceUp: true,
              }
            : c,
        );
        this.emitChange(cardBelowStack.id);
      }
    }

    this.saveState();
  }

  public moveStack(cardIds: string[], toX: number, toY: number): void {
    const undefinedCards = cardIds.map((id) =>
      this.cards.find((c) => c.id === id),
    );
    if (undefinedCards.some((c) => !c)) return;
    const cards = undefinedCards as Card[];

    cards.sort((a, b) => a.position.z - b.position.z);

    if (
      !cards[0].faceUp ||
      !this.canMoveCard(cards[0], toX, toY) ||
      !this.canMoveStack(cards)
    )
      return;

    const updatedCardsToMove = cards
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

    const targetCardZ = this.cards
      .filter((c) => c.position.x === toX && c.position.y === toY)
      .reduce((maxZ, c) => (c.position.z > maxZ ? c.position.z : maxZ), -1);

    const newTopCard = this.cards.find(
      (c) =>
        c.position.x === cards[0].position.x &&
        c.position.y === cards[0].position.y &&
        c.position.z === cards[0].position.z - 1,
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
            z: targetCardZ + updatedCard.position.z + 1,
          },
        };
      }
      return c;
    });

    updatedCardsToMove.forEach((card) => {
      this.emitChange(card.id);
    });

    const stack = this.cards.filter(
      (c) => c.position.x === toX && c.position.y === toY && c.faceUp,
    );

    const isStackComplete = this.checkStackComplete(stack);

    if (isStackComplete) {
      const cardBelowStack = this.cards.find(
        (c) =>
          c.position.x === toX &&
          c.position.y === toY &&
          c.position.z === stack[0].position.z - 1,
      );
      console.log(cardBelowStack);

      if (cardBelowStack) {
        this.cards = this.cards.map((c) =>
          c.id === cardBelowStack.id
            ? {
                ...c,
                faceUp: true,
              }
            : c,
        );
        this.emitChange(cardBelowStack.id);
      }
    }

    this.saveState();
  }

  private checkStackComplete(stack: Card[]): boolean {
    if (stack.length !== 13) return false;

    stack.forEach((card, index) => {
      this.cards = this.cards.map((c) =>
        c.id === card.id
          ? {
              ...c,
              position: { x: this.foundationsCompleted + 1, y: 0, z: index },
            }
          : c,
      );
      this.emitChange(card.id);
    });

    this.foundationsCompleted++;
    return true;
  }

  public dealStockCards(stock: Card[]): Card[] {
    const dealtCards: Card[] = [];

    for (let i = 0; i < 10; i++) {
      const topCard = stock.shift();

      if (!topCard) return [];

      const tableauCards = this.cards.filter(
        (c) => c.position.x === i && c.position.y === 1,
      );

      const zIndex = tableauCards.length;

      this.cards = this.cards.map((card) =>
        card.id === topCard.id
          ? {
              ...card,
              position: { x: i, y: 1, z: zIndex },
              faceUp: true,
            }
          : card,
      );

      dealtCards.push({
        ...topCard,
        position: { x: i, y: 1, z: zIndex },
        faceUp: true,
      });
    }

    return dealtCards;
  }

  public getCard(cardId: string): Card | undefined {
    return this.cards.find((c) => c.id === cardId);
  }

  public getCards(): Card[] {
    return this.cards;
  }
}
