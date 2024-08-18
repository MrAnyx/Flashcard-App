<template>
    <BaseModal title="Create a topic">
        <UForm
            :schema="schema"
            :state="formData"
            class="space-y-8"
            :validate-on="['submit']"
            @submit="onSubmit"
        >
            <div class="flex flex-col space-y-4">
                <UFormGroup
                    label="Name"
                    name="name"
                >
                    <UInput
                        v-model="formData.name"
                        autofocus
                        placeholder="You topic name"
                    />
                </UFormGroup>

                <UFormGroup
                    label="Description"
                    name="description"
                >
                    <UTextarea
                        v-model="formData.description"
                        :rows="7"
                        placeholder="You topic description"
                    />
                </UFormGroup>
            </div>

            <UCheckbox
                v-if="!props.topic"
                v-model="formProvider.keepCreating"
                label="Keep creating topics  ?"
            />

            <UButton
                type="submit"
                block
                :loading="formProvider.loading"
            >
                {{ props.topic ? "Update" : "Create" }}
            </UButton>
        </UForm>
    </BaseModal>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { Topic } from "~/types/entity";
import type { FormSubmitEvent } from "#ui/types";

const props = defineProps<{
    topic?: Topic;
}>();

const modal = useModal();
const repository = useRepository();
const topicStore = useTopicStore();
const validationRule = useValidationRule();

const schema = z.object({
    name: validationRule.name,
    description: validationRule.description
});

type Schema = z.output<typeof schema>;

const formProvider = reactive({
    loading: false,
    keepCreating: false
});

const formData = reactive({
    name: props.topic?.name ?? "",
    description: props.topic?.description ?? "",
});

const onSubmit = async (event: FormSubmitEvent<Schema>) =>
{
    try
    {
        formProvider.loading = true;

        if (props.topic)
        {
            const topic = await repository.topic.updatePartialTopic(props.topic.id, {
                name: event.data.name,
                description: event.data.description,
            });

            topicStore.update(props.topic.id, topic.data);
        }
        else
        {
            const topic = await repository.topic.createTopic({
                name: event.data.name,
                description: event.data.description,
                favorite: false
            });

            topicStore.prepend(topic.data);
        }

        useStandardToast("success", {
            description: `The topic ${event.data.name} has been ${props.topic ? "updated" : "created"}`
        });

        if (formProvider.keepCreating)
        {
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
        formProvider.loading = false;
    }
};
</script>
