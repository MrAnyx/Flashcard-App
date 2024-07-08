<template>
    <UModal prevent-close>
        <UCard>
            <template #header>
                <div class="flex justify-between items-center">
                    <span class="font-medium">{{ props.unit ? "Edit" : "Create" }} a unit</span>
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
                            placeholder="Your unit name"
                        />
                    </UFormGroup>

                    <UFormGroup
                        label="Description"
                        name="description"
                    >
                        <UTextarea
                            v-model="state.description"
                            :rows="7"
                            placeholder="Your unit description"
                        />
                    </UFormGroup>
                </div>

                <UButton
                    type="submit"
                    block
                    :loading="state.loading"
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

const props = defineProps<{
    topic: Topic;
    unit?: Unit;
}>();

const modal = useModal();
const data = useData();
const unitStore = useUnitStore();

const schema = z.object({
    name: z.string()
        .min(1, "The name can not be blank")
        .max(35, "The name is too long"),
    description: z.string()
        .max(300, "The description is too long")
});

const state = reactive({
    name: props.unit?.name ?? "",
    description: props.unit?.description ?? "",
    loading: false
});

const onSubmit = async () =>
{
    try
    {
        state.loading = true;
        if (props.unit)
        {
            const unit = await data.unit.updatePartialUnit(props.unit.id, {
                name: state.name,
                description: state.description,
            });

            unitStore.update(props.unit.id, unit!.data);
        }
        else
        {
            const unit = await data.unit.createUnit(props.topic.id, {
                name: state.name,
                description: state.description,
                favorite: false
            });

            unitStore.prepend(unit!.data);
        }

        useStandardToast("success", {
            description: `The unit ${state.name} has been ${props.unit ? "updated" : "created"}`
        });
        modal.close();
    }
    finally
    {
        state.loading = false;
    }
};
</script>
