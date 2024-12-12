import { usePracticeStore } from "~/stores/practice.store";
import type { Collection } from "~/types/session";

export default async (collection?: Collection): Promise<void> =>
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            const session = await getSession(collection);

            if (session.session === null)
            {
                useStandardToast("warning", {
                    description: collection ? "You have no flashcards to review today on this collection" : "You have no flashcards to review today"
                });
                resolve();
                return;
            }

            usePracticeStore().defineSession(session);

            await navigateTo({
                name: "session"
            });
            resolve();
            return;
        }
        catch
        {
            useStandardToast("error", {
                description: "Unable to start a new session"
            });
            reject();
            return;
        }
    });
};
