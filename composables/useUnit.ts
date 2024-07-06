import type { Pagination } from "~/types/core";
import type { Unit } from "~/types/entity";
import type { JsonStandard } from "~/types/request";

export default () =>
{
    const getUnitsByTopic = (topicId: number, pagination: Pagination) =>
    {
        return new Promise<JsonStandard<Unit[]>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<Unit[]>(`/topics/${topicId}/units`, {
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

    const getUnits = (pagination: Pagination) =>
    {
        return new Promise<JsonStandard<Unit[]>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<Unit[]>(`/units`, {
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

    const getUnit = (id: number) =>
    {
        return new Promise<JsonStandard<Unit>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<Unit>(`/units/${id}`, {
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

    const updatePartialUnit = (id: number, updatedElement: Partial<Unit>) =>
    {
        return new Promise<JsonStandard<Unit>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<Unit>(`/units/${id}`, {
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

    const updateUnit = (id: number, updatedElement: Unit) =>
    {
        return updatePartialUnit(id, updatedElement);
    };

    const createUnit = (topicId: number, unit: Pick<Unit, "name" | "description" | "favorite">) =>
    {
        return new Promise<JsonStandard<Unit>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<Unit>("/units", {
                method: "POST",
                body: {
                    ...unit,
                    topic: topicId
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

    const deleteUnit = (id: number) =>
    {
        return new Promise<JsonStandard<null>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<null>(`/units/${id}`, {
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

    const resetUnit = (id: number) =>
    {
        return new Promise<JsonStandard<null>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<null>(`/units/${id}/flashcards/reset`, {
                method: "PATCH"
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
        getUnitsByTopic,
        getUnits,
        getUnit,
        createUnit,
        updateUnit,
        updatePartialUnit,
        deleteUnit,
        resetUnit
    };
};
