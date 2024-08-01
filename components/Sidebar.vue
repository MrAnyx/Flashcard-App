<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="flex flex-col space-y-3 h-full">
        <div class="flex space-x-2 lg:space-x-0">
            <UButton
                color="gray"
                variant="ghost"
                square
                icon="i-tabler-layout-sidebar-left-collapse"
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

        <UButton
            icon="i-tabler-search"
            color="gray"
            @click="modal.open(ModalSearchCommandPalette)"
        >
            <div class="flex justify-between items-center w-full">
                Search
                <div class="flex gap-x-1">
                    <UKbd>Ctrl</UKbd>
                    <UKbd>K</UKbd>
                </div>
            </div>
        </UButton>

        <UVerticalNavigation :links="navigationLinks">
            <template #default="{ link }">
                <UTooltip
                    v-if="link.premium && !authStore.isPremium"
                    text="Premium feature"
                    :popper="{ placement: 'right' }"
                >
                    <span>{{ link.label }}</span>
                </UTooltip>
            </template>
            <template #badge="{ link }">
                <UKbd
                    v-if="link.badge"
                    class="px-1.5 py-1 ml-auto relative"
                >
                    {{ formatNumber(link.badge) }}
                </UKbd>
            </template>
        </UVerticalNavigation>
        <div class="flex-1" />
        <UVerticalNavigation :links="otherLinks" />

        <UDropdown :items="profileDropdownOptions">
            <template #account="{ item }">
                <div class="text-left truncate">
                    <p>Signed in as</p>
                    <p class="truncate font-medium text-gray-900 dark:text-white">
                        {{ item.label }}
                    </p>
                </div>
            </template>
            <UButton
                color="gray"
                variant="ghost"
                truncate
                class="justify-start"
                block
            >
                <template #leading>
                    <UAvatar
                        size="2xs"
                        :alt="authStore.user?.username"
                    />
                </template>

                <div class="flex justify-between items-center w-full">
                    {{ authStore.user?.username }}

                    <UTooltip
                        v-if="authStore.isPremium"
                        text="Premium account"
                    >
                        <UIcon
                            name="i-tabler-rosette-discount-check"
                            class="text-yellow-600 dark:text-yellow-500 w-4 h-4"
                        />
                    </UTooltip>
                </div>
            </UButton>
        </UDropdown>
    </div>
</template>

<script setup lang="ts">
import { ModalSearchCommandPalette, ModalShortcuts } from "#components";
import type { DropdownItem, VerticalNavigationLink } from "#ui/types";

defineEmits(["close"]);

const authStore = useAuthStore();
const modal = useModal();
const version = useVersion();
const flashcardStore = useFlashcardStore();

const navigationLinks: VerticalNavigationLink[][] = [[{
    label: "Collection",
    icon: "i-tabler-layout-dashboard",
    badge: flashcardStore.total,
    to: "/app/collection"
}, {
    label: "Practice",
    icon: "i-tabler-school",
    badge: flashcardStore.totalToReview,
    to: "/app/practice"
}, {
    label: "Favorites",
    icon: "i-tabler-star",
    badge: 5,
    to: "/app/favorites"
},
...(authStore.isPremium
    ? [{
            label: "Analytics",
            icon: "i-tabler-chart-pie",
        }]
    : []),
{
    label: "Settings",
    icon: "i-tabler-settings",
    to: "/app/settings/account"
}]];

const otherLinks: VerticalNavigationLink[][] = [
    [
        ...(authStore.isAdmin
            ? [{
                    label: "Admin dashboard",
                    icon: "i-tabler-table",
                    to: {
                        name: "admin-dashboard"
                    }
                }]
            : []),
        ...(!authStore.isPremium
            ? [{
                    label: "Upgrade to premium",
                    icon: "i-tabler-rosette-discount-check",
                    labelClass: "text-yellow-500",
                    iconClass: "bg-yellow-500",
                }]
            : []),
        {
            label: "Help & Documentation",
            icon: "i-tabler-info-square-rounded"
        }, {
            label: "Terms of use",
            icon: "i-tabler-file-check"
        }
    ]
];

const profileDropdownOptions: DropdownItem[][] = [
    [{
        label: authStore.user!.email,
        slot: "account",
        disabled: true,
    }, {
        label: `Version: ${version}`,
        disabled: true
    }], [
        {
            label: "Profile",
            icon: "i-tabler-user",
        }, {
            label: "Shortcuts",
            icon: "i-tabler-terminal-2",
            shortcuts: ["?"],
            click: () =>
            {
                modal.open(ModalShortcuts);
            }
        }
    ], [{
        label: "Sign out",
        icon: "i-tabler-logout-2",
        click: () =>
        {
            authStore.logout();
            return navigateTo({ name: "landing" });
        }
    }]
];
</script>
