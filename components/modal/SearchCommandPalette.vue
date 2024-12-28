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

const globalCommandPalette = ref();

const query = computed({
    get: () => globalCommandPalette.value?.query,
    set: (value) =>
    {
        globalCommandPalette.value.query = value;
    }
});

const closeButton = computed(() => query.value ? { icon: "i-tabler-x", color: "gray", variant: "link", padded: false } : null);

const onSelect = (option: Command) => option.click();

const groups: Group[] = [
    {
        key: "topics",
        label: (q: string) => q && `Topics`,
        search: async (q: string) =>
        {
            if (!q)
            {
                return [];
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const users: any[] = await $fetch("https://jsonplaceholder.typicode.com/users", { params: { q } });

            return users.map(user => ({ id: user.id, label: user.name, suffix: user.email }));
        }
    },
    {
        key: "global",
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
    }
];
</script>
