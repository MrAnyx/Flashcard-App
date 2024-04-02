<template>
    <div class="flex flex-col space-y-3 h-full">
        <div class="flex space-x-2 lg:space-x-0">
            <UButton
                color="gray"
                variant="ghost"
                square
                icon="i-heroicons-bars-3"
                size="sm"
                class="lg:hidden"
                @click.prevent="$emit('close')"
            />
            <UButton color="gray" variant="ghost" label="Flashcard" class="flex-1" :to="{name: 'home'}">
                <template #leading>
                    <img src="@/assets/images/logo.svg" alt="Image" height="20" width="20">
                </template>
            </UButton>
        </div>
        <UVerticalNavigation :links="navigationLinks" />
        <div class="flex-1" />
        <UVerticalNavigation :links="otherLinks" />
    </div>
</template>

<script setup lang="ts">
import type { VerticalNavigationLink } from "#ui/types";

defineEmits(["close"]);

const navigationLinks: VerticalNavigationLink[] = [{
    label: "Collection",
    icon: "i-heroicons-squares-2x2",
    badge: 4,
    to: { name: "topics" }
}, {
    label: "Practice",
    icon: "i-heroicons-academic-cap",
    badge: 125,
    to: { name: "practice" }
}, {
    label: "Settings",
    icon: "i-heroicons-cog-6-tooth",
    to: { name: "settings" }
}];

const otherLinks: VerticalNavigationLink[][] = [[{
    label: "Help & Documentation",
    icon: "i-heroicons-question-mark-circle"
}, {
    label: "Terms of use",
    icon: "i-heroicons-document-check"
}, {
    label: "Sign out",
    icon: "i-heroicons-arrow-left-start-on-rectangle"
}], [{
    label: "MrAnyx",
    avatar: {
        alt: "MrAnyx"
    }
}]];
</script>
