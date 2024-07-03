import type { Pagination } from "~/types/core";
import type { Topic } from "~/types/entity";
import type { JsonStandard } from "~/types/request";

export default () =>
{
    const getTopics = (pagination: Pagination) =>
    {
        return new Promise<JsonStandard<Topic[]>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<Topic[]>("/topics", {
                method: "GET",
                query: {
                    ...pagination
                }
            });

            if (!error.value)
            {
                resolve(data.value!);
            }
            else
            {
                switch (error.value.statusCode)
                {
                    case 401:
                        useStandardToast("unauthorized");
                        break;
                    default:
                        useStandardToast("error");
                        break;
                }

                reject(error);
            }
        });
    };

    const getTopic = (id: number) =>
    {
        return new Promise<JsonStandard<Topic>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<Topic>(`/topics/${id}`, {
                method: "GET"
            });

            if (!error.value)
            {
                resolve(data.value!);
            }
            else
            {
                switch (error.value.statusCode)
                {
                    case 401:
                        useStandardToast("unauthorized");
                        break;
                    default:
                        useStandardToast("error");
                        break;
                }

                reject(error);
            }
        });
    };

    const updatePartialTopic = (id: number, updatedElement: Partial<Topic>) =>
    {
        return new Promise<JsonStandard<Topic>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<Topic>(`/topics/${id}`, {
                method: "PATCH",
                body: {
                    ...updatedElement
                }
            });

            if (!error.value)
            {
                resolve(data.value!);
            }
            else
            {
                switch (error.value.statusCode)
                {
                    case 401:
                        useStandardToast("unauthorized");
                        break;
                    default:
                        useStandardToast("error");
                        break;
                }

                reject(error);
            }
        });
    };

    const updateTopic = (id: number, updatedElement: Topic) =>
    {
        return updatePartialTopic(id, updatedElement);
    };

    const createTopic = (topic: Pick<Topic, "name" | "description" | "favorite">) =>
    {
        return new Promise<JsonStandard<Topic>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<Topic>("/topics", {
                method: "POST",
                body: {
                    ...topic
                }
            });

            if (!error.value)
            {
                resolve(data.value!);
            }
            else
            {
                switch (error.value.statusCode)
                {
                    case 401:
                        useStandardToast("unauthorized");
                        break;
                    default:
                        useStandardToast("error");
                        break;
                }

                reject(error);
            }
        });
    };

    const deleteTopic = (id: number) =>
    {
        return new Promise<JsonStandard<null>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<null>(`/topics/${id}`, {
                method: "DELETE"
            });

            if (!error.value)
            {
                resolve(data.value!);
            }
            else
            {
                switch (error.value.statusCode)
                {
                    case 401:
                        useStandardToast("unauthorized");
                        break;
                    default:
                        useStandardToast("error");
                        break;
                }

                reject(error);
            }
        });
    };

    return {
        getTopics,
        getTopic,
        createTopic,
        updateTopic,
        updatePartialTopic,
        deleteTopic
    };
};
