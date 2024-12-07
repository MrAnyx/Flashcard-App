import { defineStore } from "pinia";
import type { Session } from "~/types/entity";

type State = {
    total: number;
    sessions: Session[];
};

export const useSessionStore = defineStore("session", {
    state: (): State => ({
        total: 0,
        sessions: [],
    }),
    actions: {
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
