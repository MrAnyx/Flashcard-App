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
                    description: "You have no flashcards to review today"
                });
                resolve();
                return;
            }

            useSessionStore().defineSession(session);

            await navigateTo({
                name: "session"
            });
            resolve();
        }
        catch
        {
            useStandardToast("error", {
                description: "Unable to start a new session"
            });
            reject();
        }
    });
};
