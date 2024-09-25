import type { Collection } from "~/types/session";

export default async (collection?: Collection) =>
{
    const repository = useRepository();

    // TODO Incrementer le nombre de session dans le store
    // TODO return a promise
    // TODO Créer un fichier startSession qui regroupe le modal
    if (collection === undefined)
    {
        return repository.flashcard.session();
    }
    else
    {
        switch (collection.type)
        {
            case "topic":
                return repository.topic.session(collection.id);
            case "unit":
                return repository.unit.session(collection.id);
            default:
                throw new Error(`Unknown collection type ${collection.type}`);
        }
    }
};
