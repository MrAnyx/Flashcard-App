import type { SettingName } from "~/types/settings";

export default async (settingName: SettingName, value: string | number | boolean) =>
{
    const repository = useRepository();
    const authStore = useAuthStore();

    try
    {
        await repository.user.updateSetting(settingName, value);
        authStore.setSetting(settingName, value);

        useStandardToast("success", {
            description: "Settings saved"
        });
    }
    catch
    {
        useStandardToast("error", {
            description: `Unable to update setting ${settingName}`
        });
    }
};
