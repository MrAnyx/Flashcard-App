<template>
    <div class="flex flex-col gap-y-8">
        <HeaderWithCaption
            title="Appearance"
            caption="Customize the way the application looks like"
        />
        <section class="flex flex-col gap-y-6">
            <SettingsParameterEntry
                label="Color theme"
                caption="Switch to light, dark or system theme"
            >
                <USelectMenu
                    v-model="selectedColorTheme"
                    :options="colorThemeOptions"
                    @change="updateTheme"
                >
                    <template #label>
                        <UIcon :name="selectedColorTheme!.icon" />
                        <span class="truncate">{{ selectedColorTheme!.label }}</span>
                    </template>

                    <template #option="{ option: theme }">
                        <UIcon :name="theme!.icon" />
                        <span class="truncate">{{ theme!.label }}</span>
                    </template>
                </USelectMenu>
            </SettingsParameterEntry>
            <SettingsParameterEntry
                label="Primary color"
                caption="Select the accent color"
            >
                <USelectMenu
                    v-model="selectedPrimaryColor"
                    :options="primaryColorOptions"
                    size="md"
                    @change="updatePrimaryColor"
                >
                    <template #label>
                        <span
                            :class="`w-3 h-3 rounded-full`"
                            :style="`background-color: ${selectedPrimaryColor!.color}`"
                        />
                        <span class="truncate capitalize ml-1">{{ selectedPrimaryColor!.name }}</span>
                    </template>

                    <template #option="{ option: primary }">
                        <span
                            :class="`w-3 h-3 rounded-full`"
                            :style="`background-color: ${primary!.color}`"
                        />
                        <span class="truncate capitalize ml-1">{{ primary!.name }}</span>
                    </template>
                </USelectMenu>
            </SettingsParameterEntry>

            <SettingsParameterEntry
                label="Gray color"
                caption="Select the secondary color"
            >
                <USelectMenu
                    v-model="selectedGrayColor"
                    :options="grayColorOptions"
                    size="md"
                    @change="updateGrayColor"
                >
                    <template #label>
                        <span
                            :class="`w-3 h-3 rounded-full`"
                            :style="`background-color: ${selectedGrayColor!.color}`"
                        />
                        <span class="truncate capitalize ml-1">{{ selectedGrayColor!.name }}</span>
                    </template>

                    <template #option="{ option: gray }">
                        <span
                            :class="`w-3 h-3 rounded-full`"
                            :style="`background-color: ${gray!.color}`"
                        />
                        <span class="truncate capitalize ml-1">{{ gray!.name }}</span>
                    </template>
                </USelectMenu>
            </SettingsParameterEntry>
        </section>
    </div>
</template>

<script setup lang="ts">
import colors from "#tailwind-config/theme/colors";

definePageMeta({
    name: "settings-appearance"
});

useHead({
    title: "Appearance"
});

const authStore = useAuthStore();
const appConfig = useAppConfig();
const colorMode = useColorMode();

// Color theme
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
    await setSetting("color_theme", selectedColorTheme.value!.value);
    colorMode.preference = selectedColorTheme.value!.value;
};

// Primary color
const primaryColor = authStore.getSetting<string>("primary_color");
const primaryColorOptions = ["red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"].map(color => ({
    name: color,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    color: (colors as any)[color][500]
}));
const selectedPrimaryColor = ref(primaryColorOptions.find(c => c.name === primaryColor));
const updatePrimaryColor = async () =>
{
    await setSetting("primary_color", selectedPrimaryColor.value!.name);
    appConfig.ui.primary = selectedPrimaryColor.value!.name;
};

// Gray color
const grayColor = authStore.getSetting<string>("gray_color");
const grayColorOptions = ["slate", "cool", "zinc", "neutral", "stone"].map(color => ({
    name: color,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    color: (colors as any)[color][500]
}));
const selectedGrayColor = ref(grayColorOptions.find(c => c.name === grayColor));
const updateGrayColor = async () =>
{
    await setSetting("gray_color", selectedGrayColor.value!.name);
    appConfig.ui.gray = selectedGrayColor.value!.name;
};
</script>
