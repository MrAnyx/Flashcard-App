<template>
    <UModal>
        <UCard>
            <template #header>
                <div class="flex justify-between items-center">
                    <span class="font-medium">{{ props.unit ? "Edit" : "Create" }} a unit</span>
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
                        />
                    </UFormGroup>

                    <UFormGroup
                        label="Name"
                        name="name"
                    >
                        <UInput
                            v-model="formData.name"
                            autofocus
                            placeholder="Your unit name"
                        />
                    </UFormGroup>

                    <UFormGroup
                        label="Description"
                        name="description"
                    >
                        <UTextarea
                            v-model="formData.description"
                            :rows="7"
                            placeholder="Your unit description"
                        />
                    </UFormGroup>
                </div>

                <UCheckbox
                    v-model="formProvider.keepCreating"
                    label="Keep creating units ?"
                />

                <UButton
                    type="submit"
                    block
                    :loading="formProvider.loadingForm"
                >
                    {{ props.unit ? "Update" : "Create" }}
                </UButton>
            </UForm>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { Topic, Unit } from "~/types/entity";
import type { FormSubmitEvent } from "#ui/types";

const props = defineProps<{
    topic?: Topic;
    unit?: Unit;
}>();

const modal = useModal();
const repository = useRepository();
const topicStore = useTopicStore();
const unitStore = useUnitStore();
const validationRule = useValidationRule();

const schema = z.object({
    topicId: z.number({ required_error: "Select a topic from the list" }),
    name: validationRule.name,
    description: validationRule.description,
});

type Schema = z.output<typeof schema>;

const formProvider = reactive({
    topics: [] as Topic[],
    loadingTopics: false,
    loadingForm: false,
    keepCreating: false
});

const formData = reactive({
    topicId: props.topic?.id,
    name: props.unit?.name ?? "",
    description: props.unit?.description ?? "",
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

const onSubmit = async (event: FormSubmitEvent<Schema>) =>
{
    try
    {
        formProvider.loadingForm = true;

        if (props.unit)
        {
            const unit = await repository.unit.updatePartialUnit(props.unit.id, {
                name: event.data.name,
                description: event.data.description,
            });

            unitStore.update(props.unit.id, unit.data);
        }
        else
        {
            const unit = await repository.unit.createUnit(event.data.topicId, {
                name: event.data.name,
                description: event.data.description,
                favorite: false
            });

            if (topicStore.selectedTopic?.id === event.data.topicId)
            {
                unitStore.prepend(unit.data);
            }
        }

        useStandardToast("success", {
            description: `The unit ${event.data.name} has been ${props.unit ? "updated" : "created"}`
        });

        if (formProvider.keepCreating)
        {
            formData.topicId = undefined;
            formData.name = "";
            formData.description = "";
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
