<template>
    <BaseModal
        :title="`${props.topic ? 'Update' : 'Create'} a unit`"
        icon="i-tabler-color-swatch"
    >
        <UForm
            :schema="schema"
            :state="formData"
            class="space-y-6"
            :validate-on="['submit']"
            @submit="onSubmit"
        >
            <UFormGroup
                v-if="props.topic === undefined"
                name="topicId"
                label="Topic"
            >
                <USelectMenu
                    v-model="formData.topicId"
                    :searchable="loadTopics"
                    searchable-lazy
                    placeholder="Select a topic"
                    option-attribute="name"
                    value-attribute="id"
                    :debounce="350"
                    :query="formProvider.searchTopicQuery"
                    searchable-placeholder="Topic name"
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
                    placeholder="My awesome unit"
                />
            </UFormGroup>

            <UFormGroup
                label="Description"
                name="description"
            >
                <UTextarea
                    v-model="formData.description"
                    :rows="7"
                    placeholder="This topic contains wonderful items"
                />
            </UFormGroup>

            <UCheckbox
                v-if="!props.unit"
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
    </BaseModal>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { Topic, Unit } from "~/types/entity";
import type { FormSubmitEvent } from "#ui/types";
import type { Filter } from "~/types/core";

const props = defineProps<{
    topic?: Topic;
    unit?: Unit;
}>();

const modal = useModal();
const repository = useRepository();
const unitStore = useUnitStore();
const validationRule = useValidationRule();

const schema = z.object({
    topicId: z.number({ required_error: "Select a topic from the list" }),
    name: validationRule.name,
    description: validationRule.description,
});

type Schema = z.output<typeof schema>;

const formProvider = reactive({
    loadingTopics: false,
    loadingForm: false,
    keepCreating: false,
    searchTopicQuery: props.topic ? props.topic.name : ""
});

const formData = reactive({
    topicId: props.topic?.id,
    name: props.unit?.name ?? "",
    description: props.unit?.description ?? "",
});

const loadTopics = async (q: string) =>
{
    const topics: Topic[] = [];

    try
    {
        formProvider.loadingTopics = true;

        const filter: Filter | null = q
            ? { operator: "like", filter: "name", value: q }
            : null;

        const response = await repository.topic.findAll(
            { order: "ASC", page: 1, sort: "name", itemsPerPage: 50 },
            filter
        );
        topics.push(...response.data);
    }
    finally
    {
        formProvider.loadingTopics = false;
    }

    return topics;
};

const onSubmit = async (event: FormSubmitEvent<Schema>) =>
{
    try
    {
        formProvider.loadingForm = true;

        if (props.unit)
        {
            const unit = await repository.unit.partialUpdate(props.unit.id, {
                name: event.data.name,
                description: event.data.description,
            });

            unitStore.update(props.unit.id, unit);
        }
        else
        {
            const unit = await repository.unit.create(event.data.topicId, {
                name: event.data.name,
                description: event.data.description,
                favorite: false
            });

            unitStore.prepend(unit);
        }

        useStandardToast("success", {
            description: `The unit ${event.data.name} has been ${props.unit ? "updated" : "created"}`
        });

        if (formProvider.keepCreating)
        {
            if (!props.topic)
            {
                formData.topicId = undefined;
                formProvider.searchTopicQuery = "";
            }
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
