<template>
    <div class="flex flex-col space-y-4 h-full overflow-auto">
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
                :to="{ name: 'overview' }"
            >
                <template #leading>
                    <NuxtImg
                        src="logo.svg"
                        height="20"
                        width="20"
                        class="mr-2"
                    />
                </template>
            </UButton>
        </div>

        <UButton
            icon="i-tabler-search"
            color="gray"
            variant="solid"
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
            <template #badge="{ link }">
                <UKbd
                    v-if="link.badge"
                    class="ml-auto relative"
                >
                    {{ formatNumber(link.badge) }}
                </UKbd>
            </template>
        </UVerticalNavigation>

        <div class="flex-1" />

        <UVerticalNavigation :links="otherLinks" />

        <UDropdown :items="profileDropdownOptions">
            <template #account>
                <div class="text-left truncate">
                    <p>Signed in as</p>
                    <p class="truncate font-medium text-gray-900 dark:text-white">
                        {{ safeValue(authStore.user?.email, '') }}
                    </p>
                </div>
            </template>
            <UButton
                color="gray"
                variant="ghost"
                block
            >
                <div class="flex items-center gap-x-3 w-full">
                    <UAvatar
                        size="xs"
                        :alt="safeValue(authStore.user?.username, '')"
                    />

                    <div class="grow text-left">
                        {{ safeValue(authStore.user?.username, "") }}
                    </div>

                    <Tooltip
                        v-if="authStore.isPremium"
                        text="Premium account"
                        activation="hover"
                        help
                    >
                        <UIcon
                            name="i-tabler-rosette-discount-check"
                            class="text-yellow-600 dark:text-yellow-500 w-4 h-4"
                        />
                    </Tooltip>
                </div>
            </UButton>
        </UDropdown>
    </div>
</template>

<script lang="ts" setup>
import type { DropdownItem, VerticalNavigationLink } from "#ui/types";

const flashcardStore = useFlashcardStore();
const authStore = useAuthStore();
const version = useVersion();
const modal = useModal();

defineEmits(["close"]);

const navigationLinks = computed<VerticalNavigationLink[][]>(() => [[
    {
        label: "Collection",
        badge: flashcardStore.total,
        icon: "i-tabler-layout-dashboard",
        to: {
            name: "topics"
        }
    }, {
        label: "Practice",
        badge: flashcardStore.totalToReview,
        icon: "i-tabler-device-gamepad-2",
        to: {
            name: "practice"
        }
    },
    {
        label: "Settings",
        icon: "i-tabler-settings",
        to: {
            name: "settings-account"
        }
    }
]]);

const otherLinks = computed<VerticalNavigationLink[][]>(() => [
    [
        {
            label: "Help & Documentation",
            icon: "i-tabler-info-square-rounded"
        }, {
            label: "Terms of use",
            icon: "i-tabler-file-check",
            to: {
                name: "terms-of-use"
            }
        }
    ]
]);

const profileDropdownOptions = computed<DropdownItem[][]>(() => [
    [{
        label: safeValue(authStore.user?.email, ""),
        slot: "account",
        disabled: true,
    }, {
        label: `Version: ${version}`,
        disabled: true
    }], [
        {
            label: "Settings",
            icon: "i-tabler-settings",
            to: {
                name: "settings-account"
            }
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
]);
</script>
