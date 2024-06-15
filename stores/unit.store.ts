import type { Unit } from "~/types/entity";

type State = {
    recents: Unit[];
    units: Unit[];
    total: number;
};

export const useUnitStore = defineStore("unit", {
    state: (): State => ({
        recents: [],
        units: [],
        total: 0
    }),
    actions: {
        addUnit(unit: Unit)
        {
            this.units = [unit, ...this.units];
            this.incrementTotal();
        },
        deleteUnit(unit: Unit)
        {
            const elementToRemove = this.units.findIndex(t => t.id === unit.id);
            this.units.splice(elementToRemove, 1);
            this.decrementTotal();
        },
        updateUnit(id: number, unit: Partial<Unit>)
        {
            const elementToUpdate = this.units.findIndex(u => u.id === id);
            if (elementToUpdate !== -1)
            {
                const previousElement = this.units[elementToUpdate];
                this.units[elementToUpdate] = {
                    ...previousElement,
                    ...unit
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
