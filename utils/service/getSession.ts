import type { Collection } from "~/types/session";

export default async (collection?: Collection) =>
{
    const repository = useRepository();

    if (collection === undefined)
    {
        return (await repository.flashcard.session()).data;
    }
    else
    {
        switch (collection.type)
        {
            case "topic":
                return (await repository.topic.session(collection.id)).data;
            case "unit":
                return (await repository.unit.session(collection.id)).data;
            default:
                throw new Error(`Unknown collection type ${collection.type}`);
        }
    }
};
