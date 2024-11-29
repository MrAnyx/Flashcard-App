import type { SettingName } from "~/types/settings";

export default async (settingName: SettingName, value: string | number | boolean): Promise<void> =>
{
    return new Promise(async (resolve, reject) =>
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
            resolve();
        }
        catch
        {
            useStandardToast("error", {
                description: `Unable to update setting ${settingName}`
            });
            reject();
        }
    });
};
