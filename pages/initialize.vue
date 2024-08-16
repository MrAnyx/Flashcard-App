<template>
    <Loader />
</template>

<script lang="ts" setup>
import { useReviewStore } from "~/stores/review.store";

definePageMeta({
    name: "initialize"
});

useHead({
    title: "Initializing"
});

const route = useRoute();
const router = useRouter();
const applicationStore = useApplicationStore();
const repository = useRepository();
const authStore = useAuthStore();
const topicStore = useTopicStore();
const unitStore = useUnitStore();
const flashcardStore = useFlashcardStore();
const reviewStore = useReviewStore();
const colorMode = useColorMode();
const appConfig = useAppConfig();

onMounted(async () =>
{
    await initialize();
});

const initialize = async () =>
{
    try
    {
        const [user, totalTopic, totalUnits, totalFlashcards, totalFlashcardsToReview, totalReviews] = await Promise.all([
            repository.user.getMe(),
            repository.topic.countTopics(),
            repository.unit.countUnits(),
            repository.flashcard.countFlashcards(),
            repository.flashcard.countFlashcardsToReview(),
            repository.review.countReviews(false),
        ]);

        // Authentication
        authStore.login(user.data);

        // Data
        topicStore.total = totalTopic.data;
        unitStore.total = totalUnits.data;
        flashcardStore.total = totalFlashcards.data;
        flashcardStore.totalToReview = totalFlashcardsToReview.data;
        reviewStore.total = totalReviews.data;

        // Theme
        colorMode.preference = authStore.getSetting<string>("color_theme");
        appConfig.ui.primary = authStore.getSetting<string>("primary_color");
        appConfig.ui.gray = authStore.getSetting<string>("gray_color");

        applicationStore.initialized = true;
        return navigateTo(route.query.forward as string ?? router.resolve("landing").href);
    }
    catch
    {
        useStandardToast("error", {
            description: "An error occured while initializing the data"
        });
    }
};
</script>
