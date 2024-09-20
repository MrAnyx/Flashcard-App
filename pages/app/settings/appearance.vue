<template>
    <div class="flex flex-col space-y-8">
        <div>
            <h2 class="font-medium text-xl">
                Appearance
            </h2>
            <span class="text-gray-400 text-sm">Customize the way the application looks like</span>
        </div>
        <section class="flex flex-col gap-y-6">
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div>
                    <h4>Color theme</h4>
                    <span class="text-gray-400 text-sm">Switch to light, dark or system theme</span>
                </div>
                <USelectMenu
                    v-model="selectedColorTheme"
                    :options="colorThemeOptions"
                    size="md"
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
            </div>
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div>
                    <h4>Primary color</h4>
                    <span class="text-gray-400 text-sm">Select the accent color</span>
                </div>
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
            </div>
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div>
                    <h4>Gray color</h4>
                    <span class="text-gray-400 text-sm">Select the secondary color</span>
                </div>
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
            </div>
        </section>
        <UDivider />
    </div>
</template>

<script setup lang="ts">
import type { SettingName } from "~/types/settings";
import colors from "#tailwind-config/theme/colors";

definePageMeta({
    name: "settings-appearance"
});

useHead({
    title: "General"
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
