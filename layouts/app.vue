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
            <header class="h-16 shrink-0 flex items-center border-b border-gray-200 dark:border-gray-800 px-3 lg:px-6">
                <UButton
                    color="gray"
                    variant="ghost"
                    square
                    icon="i-tabler-layout-sidebar-left-expand"
                    size="sm"
                    class="mr-3 lg:hidden"
                    @click.prevent="isSidebarOpen = !isSidebarOpen"
                />
                <h1 class="text-gray-600 dark:text-gray-400 font-semibold mr-4">
                    <slot name="header" />
                </h1>
            </header>
            <main class="grow overflow-auto">
                <slot />
            </main>
        </section>
    </main>
</template>

<script lang="ts" setup>
const isSidebarOpen = ref(false);
</script>
