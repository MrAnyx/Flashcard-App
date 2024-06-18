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
        prepend(item: Flashcard)
        {
            this.flashcards = [item, ...this.flashcards];
            this.increment();
        },
        append(item: Flashcard)
        {
            this.flashcards = [...this.flashcards, item];
            this.increment();
        },
        delete(item: Flashcard)
        {
            const itemToRemove = this.flashcards.findIndex(f => f.id === item.id);
            this.flashcards.splice(itemToRemove, 1);
            this.increment();
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
