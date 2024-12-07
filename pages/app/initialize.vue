<template>
    <Loader />
</template>

<script lang="ts" setup>
definePageMeta({
    name: "initialize"
});

useHead({
    title: "Initializing application"
});

const repository = useRepository();
const authStore = useAuthStore();
const topicStore = useTopicStore();
const unitStore = useUnitStore();
const flashcardStore = useFlashcardStore();
const reviewStore = useReviewStore();
const colorMode = useColorMode();
const appConfig = useAppConfig();

const applicationStore = useApplicationStore();

onMounted(async () =>
{
    try
    {
        const [user, totalTopic, totalUnits, totalFlashcards, totalFlashcardsToReview, totalReviews] = await Promise.all([
            repository.user.findMe(),
            repository.topic.count("all"),
            repository.unit.count("all"),
            repository.flashcard.count("all"),
            repository.flashcard.count("to-review"),
            repository.review.count("all"),
        ]);

        // Authentication
        authStore.login(user);

        // Data
        topicStore.total = totalTopic;
        unitStore.total = totalUnits;
        flashcardStore.total = totalFlashcards;
        flashcardStore.totalToReview = totalFlashcardsToReview;
        reviewStore.total = totalReviews;

        // Theme
        colorMode.preference = authStore.getSetting<string>("color_theme");
        appConfig.ui.primary = authStore.getSetting<string>("primary_color");
        appConfig.ui.gray = authStore.getSetting<string>("gray_color");

        applicationStore.initialized = true;
        return redirectToForwardedRoute("overview");
    }
    catch
    {
        useStandardToast("error", {
            description: "An error occured while initializing the data"
        });
        return navigateTo({
            name: "landing"
        });
    }
});
</script>
