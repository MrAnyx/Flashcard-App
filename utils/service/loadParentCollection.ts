import type { Topic, Unit } from "~/types/entity";
import type { Collection } from "~/types/session";

export default async <T extends Topic | Unit>(collection: Collection): Promise<T | undefined> =>
{
    if (Number.isNaN(collection.id))
    {
        return;
    }

    const repository = useRepository();
    const topicStore = useTopicStore();
    const unitStore = useUnitStore();

    switch (collection.type)
    {
        case "topic":
            return (topicStore.find(collection.id) ?? await repository.topic.find(collection.id)) as T;
        case "unit":
            return (unitStore.find(collection.id) ?? await repository.unit.find(collection.id)) as T;
    }
};
