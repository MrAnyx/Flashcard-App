import type { Flashcard, Grade, Session } from "./entity";

export type Collection = {
    type: "topic" | "unit";
    id: number;
};

export type Answer = {
    grade: Grade;
    timestamp: number;
    duration: number; // In milliseconds
};

export type FlashcardSession = {
    session: Session | null;
    flashcards: Flashcard[];
};

export type Validation = "valid" | "invalid";
