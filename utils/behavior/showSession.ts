import { ModalSessionIntroduction } from "#components";
import type { Collection } from "~/types/session";

export default (collection?: Collection) =>
{
    const authStore = useAuthStore();

    if (authStore.getSetting<boolean>("show_session_introduction"))
    {
        useModal().open(ModalSessionIntroduction, {
            collection
        });
    }
    else
    {
        return;
    }
};
