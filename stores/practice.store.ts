import { DateTime } from "luxon";
import { defineStore } from "pinia";
import { GradeType, type Flashcard, type Session } from "~/types/entity";
import type { Answer } from "~/types/session";

type State = {
    currentSession?: Session;
    currentSessionFlashcards: Flashcard[];
    currentFlashcardIndex: number;
    grades: Answer[];
};

export const usePracticeStore = defineStore("practice", {
    persist: true,
    state: (): State => ({
        currentSession: undefined,
        currentSessionFlashcards: [],
        currentFlashcardIndex: 0,
        grades: [],
    }),
    actions: {
        defineSession(session: { session: Session; flashcards: Flashcard[] })
        {
            const sessionStore = useSessionStore();
            sessionStore.increment();

            this.currentSession = session.session;
            this.currentSessionFlashcards = session.flashcards;
            this.currentFlashcardIndex = 0;
            this.grades = [];
        },
        addGrade(gradeType: number)
        {
            const now = DateTime.now().toMillis();

            this.grades.push({
                grade: gradeType,
                timestamp: now,
                duration: this.currentFlashcardIndex === 0
                    ? now - DateTime.fromISO(this.currentSession!.startedAt).toMillis()
                    : now - this.grades[this.currentFlashcardIndex - 1].timestamp
            });
        },
        nextFlashcards()
        {
            this.currentFlashcardIndex++;
        },
        previousFlashcard()
        {
            this.currentFlashcardIndex--;
        },
    },
    getters: {
        hasNextFlashcard(state)
        {
            return state.currentFlashcardIndex < state.currentSessionFlashcards.length;
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
