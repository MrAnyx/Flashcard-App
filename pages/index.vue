<template>
    <div class="flex flex-col h-svh">
        <nav
            id="navbar"
            class="w-full fixed flex items-center justify-center border-b border-gray-200 dark:border-gray-800 backdrop-blur-lg bg-white/75 dark:bg-gray-900/75 z-[99]"
        >
            <div class="w-full max-w-screen-lg px-6">
                <NuxtLink
                    class="flex items-center gap-x-3"
                    :to="{ name: 'landing' }"
                >
                    <NuxtImg
                        src="logo.svg"
                        width="30"
                        height="30"
                    />
                    <span class="font-bold text-lg text-gray-800 dark:text-gray-200">
                        Flashcard
                    </span>
                    <UBadge
                        variant="subtle"
                        color="sky"
                    >
                        {{ version }}
                    </UBadge>
                </NuxtLink>
            </div>
        </nav>
        <div id="body">
            <LandingHero class="h-[60vh]" />

            <section class="max-w-screen-lg mx-auto px-6">
                <div class="border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 p-3">
                    <NuxtImg
                        src="app_example.png"
                        fit="cover"
                        class="rounded-md"
                    />
                </div>

                <div class="mt-[100px]">
                    <div class="flex flex-col justify-center gap-y-3">
                        <UBadge
                            variant="subtle"
                            class="self-center"
                        >
                            Features
                        </UBadge>
                        <h2 class="text-4xl font-bold text-gray-800 dark:text-gray-200 text-center">
                            The power of our service
                        </h2>
                        <p class="text-gray-600 dark:text-gray-400 text-center">
                            Transforming the way you learn and grow.
                        </p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <UCard
                            v-for="(feature, i) in features"
                            :key="i"
                            class="shadow-md"
                        >
                            <UIcon
                                :name="feature.icon"
                                class="w-6 h-6"
                            />
                            <p class="font-bold text-gray-800 dark:text-gray-200 mt-2">
                                {{ feature.title }}
                            </p>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {{ feature.description }}
                            </p>
                        </UCard>
                    </div>
                </div>
            </section>

            <footer class="w-full border-t border-gray-200 dark:border-gray-800 mt-[100px]">
                <div class="max-w-screen-lg mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                    <div
                        v-for="(footerLink, i) in footerLinks"
                        :key="i"
                    >
                        <h3 class="font-medium text-gray-800 dark:text-gray-200">
                            {{ footerLink.title }}
                        </h3>
                        <div class="flex flex-col gap-y-4 items-start mt-5 text-gray-600 dark:text-gray-400">
                            <NuxtLink
                                v-for="(link, j) in footerLink.links"
                                :key="j"
                                :to="link.link"
                                class="hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-x-1"
                            >
                                <UIcon
                                    :name="link.icon"
                                    class="w-5 h-5"
                                />
                                {{ link.label }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <UDivider />
                <div class="max-w-screen-lg mx-auto px-6 py-4 flex items-center justify-between">
                    <p class="text-gray-600 dark:text-gray-400 text-sm">
                        Copyright &copy; {{ DateTime.now().year }}. All rights reserved.
                    </p>
                    <div class="space-x-1">
                        <UButton
                            :icon="colorMode.preference === 'dark' ? 'i-tabler-sun' : 'i-tabler-moon'"
                            variant="ghost"
                            color="gray"
                            size="sm"
                            square
                            @click="toggleColorMode"
                        />
                        <UButton
                            icon="i-tabler-brand-github"
                            variant="ghost"
                            color="gray"
                            size="sm"
                            square
                        />
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DateTime } from "luxon";

definePageMeta({
    name: "landing",
});

useHead({
    title: "Master your knowledge"
});

const version = useVersion();
const colorMode = useColorMode();

const features = [
    {
        title: "Create your own flashcards",
        description: "Create and organize your own flashcards and learn.",
        icon: "i-tabler-cards",
    },
    {
        title: "Learn with spaced repetition",
        description: "Learn with spaced repetition and memorize better using the most advanced algorithms.",
        icon: "i-tabler-clock",
    },
    {
        title: "Track your progress",
        description: "Track your progress and see how you improve.",
        icon: "i-tabler-chart-bar",
    },
    {
        title: "Available on all devices",
        description: "Our service is available on all devices.",
        icon: "i-tabler-device-mobile",
    },
];

const toggleColorMode = () =>
{
    colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};

const footerLinks = [
    {
        title: "Resources",
        links: [
            {
                label: "Documentation",
                link: "#",
                icon: "i-tabler-file-text",
            },
            {
                label: "Terms of use",
                link: "#",
                icon: "i-tabler-scale",
            },
            {
                label: "Privacy policy",
                link: "#",
                icon: "i-tabler-lock",
            }
        ]
    },
    {
        title: "Project",
        links: [
            {
                label: "Release",
                link: "#",
                icon: "i-tabler-sparkles",
            },
        ]
    },
    {
        title: "Contact",
        links: [
            {
                label: "Email",
                link: "#",
                icon: "i-tabler-mail",
            },
            {
                label: "X (Twitter)",
                link: "#",
                icon: "i-tabler-brand-x",
            },
            {
                label: "LinkedIn",
                link: "#",
                icon: "i-tabler-brand-linkedin",
            },
            {
                label: "GitHub",
                link: "#",
                icon: "i-tabler-brand-github",
            }
        ]
    }
];
</script>

<style scoped lang="scss">
$header-height: 60px;

#navbar {
  height: $header-height;
}

#body {
  padding-top: $header-height;
}
</style>
