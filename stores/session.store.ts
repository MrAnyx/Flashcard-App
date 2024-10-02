import { DateTime } from "luxon";
import { defineStore } from "pinia";
import { GradeType, type Flashcard, type Session } from "~/types/entity";
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
        },
        accuracy(state)
        {
            const total = state.grades
                .map(g => g.grade - 1) // Only keep the grades from 0 to 3 instead of 1 to 4
                .reduce((acc, g) => acc + g, 0);

            // Calculate the accuracy between 0 and 1
            return total / (state.grades.length * (GradeType.easy - 1));
        },
        currentStrike(state)
        {
            const grades = state.grades.map(g => g.grade).reverse();

            let strike = 0;

            for (const grade of grades)
            {
                if (IsGradeCorrect(grade))
                {
                    strike++;
                }
                else
                {
                    break;
                }
            }

            return strike;
        }
    }
});
