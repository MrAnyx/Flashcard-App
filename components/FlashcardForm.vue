<template>
    <UModal prevent-close>
        <UCard>
            <template #header>
                <div class="flex justify-between items-center">
                    <span class="font-medium">{{ props.flashcard ? "Edit" : "Create" }} a flashcard</span>
                    <UButton
                        icon="i-heroicons-x-mark"
                        color="white"
                        variant="ghost"
                        @click="modal.close()"
                    />
                </div>
            </template>
            <UForm
                :schema="schema"
                :state="state"
                class="space-y-8"
                :validate-on="['submit']"
                @submit="onSubmit"
            >
                <div class="flex flex-col space-y-4">
                    <UFormGroup
                        label="Front side"
                        name="front"
                    >
                        <UInput
                            v-model="state.front"
                            autofocus
                            placeholder="Front side of the card"
                        />
                    </UFormGroup>

                    <UFormGroup
                        label="Back side"
                        name="back"
                    >
                        <UInput
                            v-model="state.back"
                            placeholder="Back side of the card"
                        />
                    </UFormGroup>

                    <UFormGroup
                        label="Details"
                        name="details"
                    >
                        <UTextarea
                            v-model="state.details"
                            :rows="7"
                            placeholder="Some details and explanations..."
                        />
                    </UFormGroup>
                </div>

                <UButton
                    type="submit"
                    block
                    :loading="state.loading"
                >
                    {{ props.flashcard ? "Update" : "Create" }}
                </UButton>
            </UForm>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { Topic, Unit, Flashcard } from "~/types/entity";

const props = defineProps<{
    topic: Topic;
    unit: Unit;
    flashcard?: Flashcard;
}>();

const modal = useModal();
const data = useData();
const flashcardStore = useFlashcardStore();

defineShortcuts({
    escape: {
        usingInput: true,
        handler: () => modal.close()
    }
});

const schema = z.object({
    front: z.string()
        .min(1, "Tha front side can not be blank")
        .max(255, "The front side is too long"),
    back: z.string()
        .min(1, "Tha back side can not be blank")
        .max(255, "The back side is too long"),
    details: z.string()
        .max(1000, "The details is too long"),
});

const state = reactive({
    front: props.flashcard?.front ?? "",
    back: props.flashcard?.back ?? "",
    details: props.flashcard?.details ?? "",
    loading: false
});

const onSubmit = async () =>
{
    state.loading = true;
    if (props.flashcard)
    {
        const flashcard = await data.flashcard.updatePartialFlashcard(props.flashcard.id, {
            front: state.front,
            back: state.back,
            details: state.details ?? null,
        });

        flashcardStore.updateFlashcard(props.flashcard.id, flashcard!.data);
    }
    else
    {
        const flashcard = await data.flashcard.createFlashcard(props.unit.id, {
            front: state.front,
            back: state.back,
            details: state.details,
            favorite: false
        });

        flashcardStore.addFlashcard(flashcard!.data);
    }

    useStandardToast("success", {
        description: `The flashcard ${state.front} has been ${props.flashcard ? "updated" : "created"}`
    });
    state.loading = false;
    modal.close();
};
</script>
