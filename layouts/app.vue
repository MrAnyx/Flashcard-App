<template>
    <main class="w-screen h-screen flex flex-row">
        <aside class="border-r border-gray-200 dark:border-gray-800 min-w-[350px] hidden lg:block">
            <Sidebar class="px-3 py-3.5" />
        </aside>
        <USlideover
            v-model="isSidebarOpen"
            class="lg:hidden"
            side="left"
            :ui="{ width: 'w-screen max-w-[350px]' }"
        >
            <aside class="h-full">
                <Sidebar
                    class="px-3 py-3.5"
                    @close="isSidebarOpen = !isSidebarOpen"
                />
            </aside>
        </USlideover>
        <section class="grow overflow-auto flex flex-col">
            <header class="h-16 shrink-0 gap-x-3 flex items-center border-b border-gray-200 dark:border-gray-800 px-3 lg:px-6">
                <UButton
                    color="gray"
                    variant="ghost"
                    square
                    icon="i-tabler-layout-sidebar-left-expand"
                    size="sm"
                    class="lg:hidden"
                    @click.prevent="isSidebarOpen = !isSidebarOpen"
                />
                <h1 class="text-gray-600 dark:text-gray-400 font-semibold truncate grow">
                    <slot name="header" />
                </h1>

                <UDropdown :items="createOptions">
                    <UButton
                        icon="i-tabler-plus"
                        color="gray"
                        variant="ghost"
                        class="shrink-0"
                        square
                    >
                        <span class="hidden lg:inline">Create</span>
                    </UButton>
                </UDropdown>
            </header>
            <main class="grow overflow-auto">
                <slot />
            </main>
        </section>
    </main>
</template>

<script lang="ts" setup>
import { ModalFlashcardForm, ModalTopicForm, ModalUnitForm } from "#components";
import type { DropdownItem } from "#ui/types";

const topicStore = useTopicStore();
const unitStore = useUnitStore();
const modal = useModal();

const isSidebarOpen = ref(false);

const createOptions = computed<DropdownItem[][]>(() => [
    [{
        label: "New topic",
        icon: "i-tabler-folder",
        shortcuts: ["C", "T"],
        click: () =>
        {
            modal.open(ModalTopicForm);
        }
    }, {
        label: "New unit",
        icon: "i-tabler-color-swatch",
        disabled: topicStore.total <= 0,
        shortcuts: ["C", "U"],
        click: () =>
        {
            modal.open(ModalUnitForm);
        }
    }, {
        label: "New flashcard",
        icon: "i-tabler-cards",
        disabled: unitStore.total <= 0,
        shortcuts: ["C", "F"],
        click: () =>
        {
            modal.open(ModalFlashcardForm);
        }
    }]
]);
</script>
