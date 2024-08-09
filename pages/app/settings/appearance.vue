<template>
    <div class="flex flex-col space-y-8">
        <div>
            <h2 class="font-medium text-xl">
                Appearance
            </h2>
            <span class="text-gray-400 text-sm">Customize the way the application looks like</span>
        </div>
        <section>
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div>
                    <h4>Color theme</h4>
                    <span class="text-gray-400 text-sm">Switch to light, dark or system theme</span>
                </div>
                <USelectMenu
                    v-model="selectedColorTheme"
                    :options="colorThemeOptions"
                    @change="updateTheme"
                >
                    <template #label>
                        <UIcon :name="selectedColorTheme.icon" />
                        <span class="truncate">{{ selectedColorTheme?.label }}</span>
                    </template>

                    <template #option="{ option: theme }">
                        <UIcon :name="theme.icon" />
                        <span class="truncate">{{ theme.label }}</span>
                    </template>
                </USelectMenu>
            </div>
        </section>
        <UDivider />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "settings-appearance"
});

useHead({
    title: "General"
});

const authStore = useAuthStore();
const repository = useRepository();

const colorThemeOptions = [
    {
        value: "light",
        label: "Light",
        icon: "i-tabler-sun"
    },
    {
        value: "dark",
        label: "Dark",
        icon: "i-tabler-moon"
    },
    {
        value: "system",
        label: "System",
        icon: "i-tabler-device-desktop"
    }
];
const colorTheme = authStore.getSetting<string>("color_theme");
const selectedColorTheme = ref(colorThemeOptions.find(t => t.value === colorTheme));

const updateTheme = async () =>
{
    try
    {
        await repository.user.updateSetting("color_theme", selectedColorTheme.value!.value);
        authStore.setSetting("color_theme", selectedColorTheme.value!.value);

        useColorMode().preference = selectedColorTheme.value!.value;

        useStandardToast("success", {
            description: "Settings saved"
        });
    }
    catch
    {
        useStandardToast("error", {
            description: `Unable to update setting color_theme`
        });
    }
};
</script>
