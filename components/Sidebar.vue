<!-- eslint-disable vue/multi-word-component-names -->
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
            <UButton
                color="gray"
                variant="ghost"
                label="Flashcard"
                class="flex-1"
                to="/app"
            >
                <template #leading>
                    <img
                        src="@/assets/images/logo.svg"
                        alt="Image"
                        height="20"
                        width="20"
                    >
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

const authStore = useAuthStore();

const navigationLinks: VerticalNavigationLink[] = [{
    label: "Collection",
    icon: "i-heroicons-squares-2x2",
    badge: "856",
    to: "/app/collection"
}, {
    label: "Practice",
    icon: "i-heroicons-academic-cap",
    badge: 125,
    to: "/app/practice"
}, {
    label: "Favorites",
    icon: "i-heroicons-star",
    badge: 56,
    to: "/app/favorites"
}, {
    label: "Settings",
    icon: "i-heroicons-cog-6-tooth",
    to: "/app/settings/account"
}];

const otherLinks: VerticalNavigationLink[][] = [
    [
        {
            label: "Help & Documentation",
            icon: "i-heroicons-question-mark-circle"
        }, {
            label: "Terms of use",
            icon: "i-heroicons-document-check"
        }, {
            label: "Sign out",
            icon: "i-heroicons-arrow-left-start-on-rectangle",
            click: () =>
            {
                useAuthStore().logout();
                return navigateTo({ name: "landing" });
            }
        }
    ], [
        {
            label: authStore.user!.username,
            avatar: {
                alt: authStore.user!.username
            }
        }
    ]
];

const adminDashboardLink: VerticalNavigationLink = {
    label: "Admin dashboard",
    icon: "i-heroicons-adjustments-horizontal",
    to: {
        name: "admin-dashboard"
    }
};
if (authStore.isAdmin)
{
    otherLinks[0].unshift(adminDashboardLink);
}
</script>
