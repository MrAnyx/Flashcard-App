import { DateTime } from "luxon";
import { defineStore } from "pinia";
import type { Flashcard, Session } from "~/types/entity";
import type { Answer } from "~/types/session";

type State = {
    total: number;
    currentSession?: Session;
    currentSessionFlashcards: Flashcard[];
    currentFlashcard: number;
    grades: Answer[];
};

export const useSessionStore = defineStore("session", {
    persist: true,
    state: (): State => ({
        total: 0,
        currentSession: undefined,
        currentSessionFlashcards: [],
        currentFlashcard: 0,
        grades: [],
    }),
    actions: {
        defineSession(session: { session: Session; flashcards: Flashcard[] })
        {
            this.increment();
            this.currentSession = session.session;
            this.currentSessionFlashcards = session.flashcards;
            this.currentFlashcard = 0;
            this.grades = [];
        },
        addGrade(gradeType: number)
        {
            const now = DateTime.now().toMillis();

            this.grades.push({
                grade: gradeType,
                timestamp: now,
                duration: this.currentFlashcard === 0
                    ? now - DateTime.fromISO(this.currentSession!.started_at).toMillis()
                    : now - this.grades[this.currentFlashcard - 1].timestamp
            });
        },
        nextFlashcards()
        {
            this.currentFlashcard++;
        },
        previousFlashcard()
        {
            this.currentFlashcard--;
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
    getters: {
        hasNextFlashcard(state)
        {
            return state.currentFlashcard < state.currentSessionFlashcards.length;
        }
    }
});
