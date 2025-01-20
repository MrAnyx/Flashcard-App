<template>
    <div class="h-svh w-full grid place-items-center p-5 overflow-auto">
        <UCard
            class="max-w-[500px] w-full"
            :ui="ui"
        >
            <div class="flex flex-col gap-y-6">
                <div class="grid place-items-center">
                    <ULink :to="{ name: 'landing' }">
                        <NuxtImg
                            src="logo.svg"
                            height="75"
                            width="75"
                        />
                    </ULink>
                </div>

                <slot name="header" />

                <slot />

                <UDivider
                    v-if="$slots.footer"
                    :ui="{ border: { base: 'dark:border-gray-700' } }"
                />

                <slot name="footer" />
            </div>
        </UCard>
    </div>
</template>

<script lang="ts" setup>
const ui = {
    background: "bg-white dark:bg-gray-800",
    shadow: "shadow",
    ring: "ring-1 ring-gray-300 dark:ring-gray-700",
    divide: "divide-y divide-gray-300 dark:divide-gray-700",
};
</script>
