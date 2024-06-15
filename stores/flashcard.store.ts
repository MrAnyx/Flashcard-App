import type { Flashcard } from "~/types/entity";

type State = {
    recents: Flashcard[];
    flashcards: Flashcard[];
    total: number;
};

export const useFlashcardStore = defineStore("flashcard", {
    state: (): State => ({
        recents: [],
        flashcards: [],
        total: 0
    }),
    actions: {
        addFlashcard(flashcard: Flashcard)
        {
            this.flashcards = [flashcard, ...this.flashcards];
            this.incrementTotal();
        },
        deleteFlashcard(flashcard: Flashcard)
        {
            const elementToRemove = this.flashcards.findIndex(t => t.id === flashcard.id);
            this.flashcards.splice(elementToRemove, 1);
            this.decrementTotal();
        },
        updateFlashcard(id: number, flashcard: Partial<Flashcard>)
        {
            const elementToUpdate = this.flashcards.findIndex(u => u.id === id);
            if (elementToUpdate !== -1)
            {
                const previousElement = this.flashcards[elementToUpdate];
                this.flashcards[elementToUpdate] = {
                    ...previousElement,
                    ...flashcard
                };
            }
        },
        incrementTotal()
        {
            this.total++;
        },
        decrementTotal()
        {
            this.total--;
        }
    },
    getters: {}
});
