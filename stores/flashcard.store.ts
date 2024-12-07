import type { Flashcard } from "~/types/entity";

type State = {
    flashcards: Flashcard[];
    total: number;
    totalToReview: number;
};

export const useFlashcardStore = defineStore("flashcard", {
    state: (): State => ({
        flashcards: [],
        total: 0,
        totalToReview: 0
    }),
    actions: {
        prepend(item: Flashcard)
        {
            this.flashcards = [item, ...this.flashcards];
            this.incrementTotal();
        },
        append(item: Flashcard)
        {
            this.flashcards = [...this.flashcards, item];
            this.incrementTotal();
        },
        delete(item: Flashcard)
        {
            const itemToRemove = this.flashcards.findIndex(f => f.id === item.id);
            this.flashcards.splice(itemToRemove, 1);
            this.decrementTotal();
        },
        update(id: number, item: Partial<Flashcard>)
        {
            const itemToUpdate = this.flashcards.findIndex(f => f.id === id);
            if (itemToUpdate !== -1)
            {
                const previousItem = this.flashcards[itemToUpdate];
                this.flashcards[itemToUpdate] = {
                    ...previousItem,
                    ...item
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
        },
        incrementFlashcardsToReview()
        {
            this.totalToReview++;
        },
        decrementFlashcardsToReview()
        {
            this.totalToReview--;
        }
    },
    getters: {}
});
