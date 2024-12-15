import type { Job } from "~/types/scheduler";

const job: Job = {
    name: "updateCardsToReview",
    schedule: "@daily",
    handler: async () =>
    {
        const flashcardStore = useFlashcardStore();
        const repository = useRepository();

        flashcardStore.totalToReview = await repository.flashcard.count("to-review");
    }
};

export default job;
