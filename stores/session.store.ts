import { DateTime } from "luxon";
import { defineStore } from "pinia";
import type { Flashcard, Session } from "~/types/entity";

type State = {
    total: number;
    currentSession?: Session;
    currentSessionFlashcards: Flashcard[];
    currentFlashcard: number;
    grades: number[];
    sessionState: "idle" | "ongoing" | "finished";
};

export const useSessionStore = defineStore("session", {
    persist: true,
    state: (): State => ({
        total: 0,
        currentSession: undefined,
        currentSessionFlashcards: [],
        currentFlashcard: 0,
        grades: [],
        sessionState: "idle",
    }),
    actions: {
        defineSession(session: { session: Session; flashcards: Flashcard[] })
        {
            this.increment();
            this.currentSession = session.session;
            this.currentSessionFlashcards = session.flashcards;
            this.sessionState = "ongoing";
            this.currentFlashcard = 0;
            this.grades = [];
        },
        addGrade(gradeType: number)
        {
            this.grades.push(gradeType);
        },
        nextFlashcards()
        {
            this.currentFlashcard++;
        },
        increment()
        {
            this.total++;
        },
        decrement()
        {
            this.total--;
        }
    },
    getters: {}
});
