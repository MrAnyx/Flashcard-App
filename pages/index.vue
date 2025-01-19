<template>
    <div class="flex flex-col h-svh">
        <nav
            id="navbar"
            class="w-full fixed flex items-center justify-center border-b border-gray-200 dark:border-gray-800 backdrop-blur-lg bg-white/75 dark:bg-gray-900/75 z-[99]"
        >
            <div class="w-full max-w-screen-lg px-6 flex items-center justify-between">
                <div class="flex items-center gap-x-3">
                    <NuxtLink
                        :to="{ name: 'landing' }"
                        class="flex items-center gap-x-3"
                    >
                        <NuxtImg
                            src="logo.svg"
                            width="30"
                            height="30"
                        />
                        <span class="font-bold text-lg c-text-primary">
                            Meeio
                        </span>
                    </NuxtLink>
                    <UBadge
                        variant="subtle"
                        color="sky"
                        class="hidden md:inline"
                    >
                        {{ version }}
                    </UBadge>
                </div>
                <div class="space-x-2">
                    <template v-if="token">
                        <UButton
                            variant="soft"
                            color="sky"
                            :to="{ name: 'overview' }"
                        >
                            Open the app
                        </UButton>
                    </template>
                    <template v-else>
                        <UButton
                            variant="ghost"
                            color="gray"
                            :to="{ name: 'login' }"
                        >
                            Sign in
                        </UButton>
                        <UButton
                            class="hidden md:inline-flex"
                            variant="soft"
                            color="sky"
                            trailing-icon="i-tabler-arrow-right"
                            :to="{ name: 'register' }"
                        >
                            Sign up
                        </UButton>
                    </template>
                </div>
            </div>
        </nav>
        <div id="body">
            <LandingHero class="h-[60vh] min-h-[450px]" />

            <section class="max-w-screen-lg mx-auto px-6 flex flex-col gap-y-[100px]">
                <div class="border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 p-3">
                    <NuxtImg
                        :src="colorMode.value === 'dark' ? 'layout_dark.png' : 'layout_light.png' "
                        fit="cover"
                        class="rounded-md w-full"
                    />
                </div>

                <div>
                    <div class="flex flex-col justify-center gap-y-3">
                        <UBadge
                            variant="subtle"
                            class="self-center"
                        >
                            Features
                        </UBadge>
                        <h2 class="text-4xl font-bold c-text-primary text-center">
                            The power of our service
                        </h2>
                        <p class="c-text-secondary text-center">
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
                                class="w-6 h-6 text-sky-500 dark:text-sky-400"
                            />
                            <p class="font-bold c-text-primary mt-2">
                                {{ feature.title }}
                            </p>
                            <p class="text-sm c-text-secondary mt-1">
                                {{ feature.description }}
                            </p>
                        </UCard>
                    </div>
                </div>

                <div class="bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center h-[350px] rounded-lg shadow-md gap-6 text-center p-6 border border-gray-200 dark:border-gray-700">
                    <h3 class="text-3xl font-bold c-text-primary">
                        Get started today
                    </h3>
                    <p class="c-text-secondary text-center">
                        Take control of your learning.
                    </p>
                    <UButton
                        variant="solid"
                        color="sky"
                        leading-icon="i-tabler-arrow-right"
                        :to="{ name: 'register' }"
                    >
                        Sign up
                    </UButton>
                </div>
            </section>

            <footer class="w-full border-t border-gray-200 dark:border-gray-800 mt-[100px]">
                <div class="max-w-screen-lg mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                    <div
                        v-for="(footerLink, i) in footerLinks"
                        :key="i"
                    >
                        <h3 class="font-medium c-text-primary">
                            {{ footerLink.title }}
                        </h3>
                        <div class="flex flex-col gap-y-4 items-start mt-5 c-text-secondary">
                            <NuxtLink
                                v-for="(link, j) in footerLink.links"
                                :key="j"
                                :to="link.link"
                                target="_blank"
                                class="hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-x-1"
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
                <div class="max-w-screen-lg mx-auto px-6 py-4 flex flex-col-reverse md:flex-row items-center justify-between gap-2">
                    <p class="c-text-secondary text-sm text-center">
                        Copyright &copy; 2024 - {{ DateTime.now().year }}. All rights reserved.
                    </p>
                    <div class="space-x-1">
                        <UButton
                            :icon="colorMode.value === 'dark' ? 'i-tabler-sun' : 'i-tabler-moon'"
                            variant="ghost"
                            color="gray"
                            size="sm"
                            square
                            @click="toggleColorMode"
                        />
                        <UButton
                            icon="i-tabler-brand-github"
                            variant="ghost"
                            to="https://github.com/meeio-app"
                            target="_blank"
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
const token = useToken();

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
    {
        title: "Open-source",
        description: "Our service is open-source and free to use.",
        icon: "i-tabler-code",
    },
    {
        title: "No ads",
        description: "We don't show ads. We respect your privacy.",
        icon: "i-tabler-ad-off",
    }
];

const toggleColorMode = () =>
{
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const footerLinks = [
    {
        title: "Resources",
        links: [
            {
                label: "Documentation",
                link: "https://docs.meeio.fr/",
                icon: "i-tabler-file-text",
            },
            {
                label: "Terms of use",
                link: "https://docs.meeio.fr/legal/terms-of-use",
                icon: "i-tabler-scale",
            },
            {
                label: "Privacy policy",
                link: "https://docs.meeio.fr/legal/privacy",
                icon: "i-tabler-lock",
            }
        ]
    },
    {
        title: "Project",
        links: [
            {
                label: "Release",
                link: "https://github.com/meeio-app",
                icon: "i-tabler-sparkles",
            },
            {
                label: "Contribute",
                link: "https://github.com/meeio-app",
                icon: "i-tabler-heart-handshake",
            },
        ]
    },
    {
        title: "Contact",
        links: [
            {
                label: "Email",
                link: "mailto:robin@codeon.fr",
                icon: "i-tabler-mail",
            },
            {
                label: "X (Twitter)",
                link: "https://x.com/MrAnyx",
                icon: "i-tabler-brand-x",
            },
            {
                label: "LinkedIn",
                link: "https://www.linkedin.com/in/rob-bch/",
                icon: "i-tabler-brand-linkedin",
            },
            {
                label: "GitHub",
                link: "https://github.com/MrAnyx",
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
