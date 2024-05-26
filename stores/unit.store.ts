import type { Unit } from "~/types/entity";

type State = {
    units: Unit[];
    recents: Unit[];
};

export const useUnitStore = defineStore("unit", {
    state: (): State => ({
        units: [],
        recents: []
    }),
    actions: {},
    getters: {
        total: (state) => {
            return state.units.length;
        }
    }
});
