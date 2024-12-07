import type { Unit } from "~/types/entity";

type State = {
    recents: Unit[];
    units: Unit[];
    total: number;
    selectedUnit?: Unit;
};

export const useUnitStore = defineStore("unit", {
    persist: {
        paths: ["selectedUnit"]
    },
    state: (): State => ({
        recents: [],
        units: [],
        total: 0,
        selectedUnit: undefined
    }),
    actions: {
        prepend(item: Unit)
        {
            this.units = [item, ...this.units];
            this.incrementTotal();
        },
        append(item: Unit)
        {
            this.units = [...this.units, item];
            this.incrementTotal();
        },
        delete(item: Unit)
        {
            const itemToRemove = this.units.findIndex(u => u.id === item.id);
            this.units.splice(itemToRemove, 1);
            this.decrementTotal();
        },
        update(id: number, item: Partial<Unit>)
        {
            const itemToUpdate = this.units.findIndex(u => u.id === id);
            if (itemToUpdate !== -1)
            {
                const previousItem = this.units[itemToUpdate];
                this.units[itemToUpdate] = {
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
        }
    },
    getters: {}
});
