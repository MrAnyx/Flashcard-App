<template>
    <main class="fixed inset-0 flex overflow-hidden">
        <aside class="border-r border-gray-200 dark:border-gray-800 w-[350px] p-4 hidden lg:block">
            <Sidebar />
        </aside>
        <USlideover
            v-model="isSidebarOpen"
            class="lg:hidden"
            side="left"
            :ui="{ width: 'w-screen max-w-[350px]' }"
        >
            <aside class="p-4 h-full">
                <Sidebar @close="isSidebarOpen = !isSidebarOpen" />
            </aside>
        </USlideover>
        <section class="flex-1 flex flex-col w-full">
            <header class="h-16 shrink-0 flex items-center border-b border-gray-200 dark:border-gray-800 px-6">
                <UButton
                    color="gray"
                    variant="ghost"
                    square
                    icon="i-tabler-layout-sidebar-left-expand"
                    size="sm"
                    class="mr-4 lg:hidden"
                    @click.prevent="isSidebarOpen = !isSidebarOpen"
                />

                <h1 class="text-gray-600 dark:text-gray-400 font-semibold mr-4">
                    <slot name="header" />
                </h1>
            </header>
            <div class="overflow-y-auto">
                <slot />
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";

const isSidebarOpen = ref(false);

let shortcuts = {};

AppShortcutSections.map(s => s.shortcuts).flatMap(s => Object.entries(s)).forEach(([key, value]) =>
{
    if (value.global)
    {
        shortcuts = {
            ...shortcuts,
            [key]: {
                name: value.name,
                handler: value.action,
                usingInput: value.usingInput
            }
        };
    }
});

defineShortcuts(shortcuts);
</script>
