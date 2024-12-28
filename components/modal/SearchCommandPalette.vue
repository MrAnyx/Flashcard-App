<template>
    <UModal>
        <UCommandPalette
            ref="globalCommandPalette"
            :groups="groups"
            nullable
            :close-button="(closeButton as Button)"
            icon="i-tabler-search"
            :autoselect="false"
            placeholder="Search anything"
            @update:model-value="onSelect"
        />
    </UModal>
</template>

<script lang="ts" setup>
import type { Button, Command, Group } from "#ui/types";

const repository = useRepository();
const modal = useModal();

const globalCommandPalette = ref();

const query = computed({
    get: () => globalCommandPalette.value?.query,
    set: (value) =>
    {
        globalCommandPalette.value.query = value;
    }
});

const closeButton = computed(() => query.value ? { icon: "i-tabler-x", color: "gray", variant: "link", padded: false } : null);

const onSelect = (option: Command | null) => option?.click?.();

const groups: Group[] = [
    {
        key: "global",
        static: true,
        label: "Global",
        commands: [
            ...Object.entries(AppShortcuts).filter(([_, shortcut]) => shortcut.commandPalette).map(([key, shortcut]) => ({
                id: key,
                label: shortcut.name,
                suffix: shortcut.description,
                icon: shortcut.icon,
                click: async () => await shortcut.action?.(),
                shortcuts: shortcut.shortcut
            } as Command))
        ]
    },
    {
        key: "topics",
        label: "Topics",
        search: async (q: string) =>
        {
            if (!q)
            {
                return [];
            }

            const topicsRes = await repository.topic.findAll(
                { itemsPerPage: 5, order: "asc", page: 1, sort: "name" },
                { filter: "name", value: q, operator: "like" }
            );

            return topicsRes.data.map(topic => ({
                id: topic.id,
                label: topic.name,
                suffix: topic.description,
                icon: "i-tabler-folder",
                click: async () =>
                {
                    modal.reset();
                    await navigateTo({ name: "units", params: { topicId: topic.id } });
                }
            } as Command));
        }
    },
    {
        key: "units",
        label: "Unit",
        search: async (q: string) =>
        {
            if (!q)
            {
                return [];
            }

            const unitsRes = await repository.unit.findAll(
                { itemsPerPage: 5, order: "asc", page: 1, sort: "name" },
                { filter: "name", value: q, operator: "like" }
            );

            return unitsRes.data.map(unit => ({
                id: unit.id,
                label: unit.name,
                suffix: unit.description,
                icon: "i-tabler-color-swatch",
                click: async () =>
                {
                    modal.reset();
                    await navigateTo({ name: "flashcards", params: { topicId: unit.topic.id, unitId: unit.id } });
                }
            } as Command));
        }
    },
];
</script>
