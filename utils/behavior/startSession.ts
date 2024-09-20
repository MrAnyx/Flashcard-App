import { ModalSessionIntroduction } from "#components";

export default () =>
{
    const authStore = useAuthStore();

    if (authStore.getSetting<boolean>("show_session_introduction"))
    {
        useModal().open(ModalSessionIntroduction);
    }
    else
    {
        return;
    }
};
