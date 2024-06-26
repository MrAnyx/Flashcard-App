<template>
    <UModal prevent-close>
        <UCard>
            <template #header>
                <div class="flex justify-between items-center">
                    <span class="font-medium">{{ props.topic ? "Edit" : "Create" }} a topic</span>
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
                        label="Name"
                        name="name"
                    >
                        <UInput
                            v-model="state.name"
                            autofocus
                            placeholder="You topic name"
                        />
                    </UFormGroup>

                    <UFormGroup
                        label="Description"
                        name="description"
                    >
                        <UTextarea
                            v-model="state.description"
                            :rows="7"
                            placeholder="You topic description"
                        />
                    </UFormGroup>
                </div>

                <UButton
                    type="submit"
                    block
                    :loading="state.loading"
                >
                    {{ props.topic ? "Update" : "Create" }}
                </UButton>
            </UForm>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { Topic } from "~/types/entity";

const props = defineProps<{
    topic?: Topic;
}>();

const modal = useModal();
const data = useData();
const topicStore = useTopicStore();

defineShortcuts({
    escape: {
        usingInput: true,
        handler: () => modal.close()
    }
});

const schema = z.object({
    name: z.string()
        .min(1, "The name can not be blank")
        .max(35, "The name is too long"),
    description: z.string()
        .max(300, "The description is too long")
});

const state = reactive({
    name: props.topic?.name ?? "",
    description: props.topic?.description ?? "",
    loading: false
});

const onSubmit = async () =>
{
    try
    {
        state.loading = true;
        if (props.topic)
        {
            const topic = await data.topic.updatePartialTopic(props.topic.id, {
                name: state.name,
                description: state.description,
            });

            topicStore.update(props.topic.id, topic!.data);
        }
        else
        {
            const topic = await data.topic.createTopic({
                name: state.name,
                description: state.description,
                favorite: false
            });

            topicStore.prepend(topic!.data);
        }

        useStandardToast("success", {
            description: `The topic ${state.name} has been ${props.topic ? "updated" : "created"}`
        });
        modal.close();
    }
    finally
    {
        state.loading = false;
    }
};
</script>
