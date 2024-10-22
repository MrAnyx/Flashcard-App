import { defineStore } from "pinia";
import type { Session } from "~/types/entity";

type State = {
    total: number;
    sessions: Session[];
};

export const useSessionStore = defineStore("session", {
    persist: true,
    state: (): State => ({
        total: 0,
        sessions: [],
    }),
    actions: {
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
