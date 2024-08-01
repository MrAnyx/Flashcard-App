<template>
    <UModal>
        <UCard>
            <template #header>
                <div class="flex justify-between items-center">
                    <span class="font-medium">{{ props.flashcard ? "Edit" : "Create" }} a flashcard</span>
                    <UButton
                        icon="i-tabler-x"
                        color="white"
                        variant="ghost"
                        @click="modal.close()"
                    />
                </div>
            </template>
            <UForm
                :schema="schema"
                :state="formData"
                class="space-y-8"
                :validate-on="['submit']"
                @submit="onSubmit"
            >
                <div class="flex flex-col space-y-4">
                    <UFormGroup
                        v-if="props.topic === undefined"
                        name="topicId"
                        label="Topic"
                    >
                        <USelectMenu
                            v-model="formData.topicId"
                            :options="formProvider.topics"
                            placeholder="Select a topic"
                            option-attribute="name"
                            value-attribute="id"
                            size="md"
                            :loading="formProvider.loadingTopics"
                            @change="loadUnits"
                        />
                    </UFormGroup>
                    <UFormGroup
                        v-if="props.unit === undefined"
                        name="unitId"
                        label="Unit"
                    >
                        <USelectMenu
                            v-model="formData.unitId"
                            :options="formProvider.units"
                            placeholder="Select a unit"
                            option-attribute="name"
                            size="md"
                            :disabled="formData.topicId === undefined"
                            :loading="formProvider.loadingUnits"
                        />
                    </UFormGroup>
                    <UFormGroup
                        label="Front side"
                        name="front"
                    >
                        <UInput
                            v-model="formData.front"
                            autofocus
                            placeholder="Front side of the card"
                        />
                    </UFormGroup>

                    <UFormGroup
                        label="Back side"
                        name="back"
                    >
                        <UInput
                            v-model="formData.back"
                            placeholder="Back side of the card"
                        />
                    </UFormGroup>

                    <UFormGroup
                        label="Details"
                        name="details"
                    >
                        <UTextarea
                            v-model="formData.details"
                            :rows="7"
                            placeholder="Some details and explanations..."
                        />
                    </UFormGroup>
                </div>

                <UCheckbox
                    v-model="formProvider.keepCreating"
                    label="Keep creating flashcards ?"
                />

                <UButton
                    type="submit"
                    block
                    :loading="formProvider.loadingForm"
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
import type { FormSubmitEvent } from "#ui/types";

const props = defineProps<{
    topic?: Topic;
    unit?: Unit;
    flashcard?: Flashcard;
}>();

const modal = useModal();
const repository = useRepository();
const flashcardStore = useFlashcardStore();
const validationRule = useValidationRule();

const schema = z.object({
    topicId: z.number({ required_error: "Select a topic from the list" }),
    unitId: z.number({ required_error: "Select a unit from the list" }),
    front: validationRule.front,
    back: validationRule.back,
    details: validationRule.details,
});

type Schema = z.output<typeof schema>;

const formProvider = reactive({
    topics: [] as Topic[],
    loadingTopics: false,
    units: [] as Unit[],
    loadingUnits: false,
    loadingForm: false,
    keepCreating: false
});

const formData = reactive({
    topicId: props.topic?.id,
    unitId: props.unit?.id,
    front: props.flashcard?.front ?? "",
    back: props.flashcard?.back ?? "",
    details: props.flashcard?.details ?? "",
});

onMounted(async () =>
{
    await loadTopics();
});

const loadTopics = async () =>
{
    try
    {
        formProvider.loadingTopics = true;

        const response = await repository.topic.getTopics({ order: "asc", page: 1, sort: "name", itemsPerPage: 200 });
        formProvider.topics = response.data;
    }
    finally
    {
        formProvider.loadingTopics = false;
    }
};

const loadUnits = async () =>
{
    if (formData.topicId)
    {
        try
        {
            formProvider.loadingUnits = true;
            formData.unitId = undefined;

            const response = await repository.unit.getUnitsByTopic(formData.topicId, { order: "asc", page: 1, sort: "name", itemsPerPage: 200 });
            formProvider.units = response.data;
        }
        finally
        {
            formProvider.loadingUnits = false;
        }
    }
};

const onSubmit = async (event: FormSubmitEvent<Schema>) =>
{
    try
    {
        formProvider.loadingForm = true;

        if (props.flashcard)
        {
            const flashcard = await repository.flashcard.updatePartialFlashcard(props.flashcard.id, {
                front: event.data.front,
                back: event.data.back,
                details: event.data.details ?? null,
            });

            flashcardStore.update(props.flashcard.id, flashcard!.data);
        }
        else
        {
            const flashcard = await repository.flashcard.createFlashcard(event.data.unitId, {
                front: event.data.front,
                back: event.data.back,
                details: event.data.details,
                favorite: false
            });

            flashcardStore.prepend(flashcard!.data);
        }

        useStandardToast("success", {
            description: `The flashcard ${event.data.front} has been ${props.flashcard ? "updated" : "created"}`
        });

        if (formProvider.keepCreating)
        {
            formData.topicId = undefined;
            formData.unitId = undefined;
            formData.front = "";
            formData.back = "";
            formData.details = "";
        }
        else
        {
            modal.close();
        }
    }
    finally
    {
        formProvider.loadingForm = false;
    }
};
</script>
