import { defineStore } from "pinia";

type State = {
    initialized: boolean;
};

export const useApplicationStore = defineStore("application", {
    state: (): State => ({
        initialized: false
    }),
    actions: {},
    getters: {}
});
