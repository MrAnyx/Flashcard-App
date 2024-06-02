import type { Unit } from "~/types/entity";

type State = {
    recents: Unit[];
};

export const useUnitStore = defineStore("unit", {
    state: (): State => ({
        recents: []
    }),
    actions: {},
    getters: {}
});
