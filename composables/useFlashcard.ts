import type { Pagination } from "~/types/core";
import type { Flashcard } from "~/types/entity";
import type { JsonStandard } from "~/types/request";

export default () =>
{
    const getFlashcardsByUnit = (unitId: number, pagination: Pagination) =>
    {
        return new Promise<JsonStandard<Flashcard[]>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<Flashcard[]>(`/units/${unitId}/flashcards`, {
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

    const getFlashcards = (pagination: Pagination) =>
    {
        return new Promise<JsonStandard<Flashcard[]>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<Flashcard[]>(`/flashcards`, {
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

    const getFlashcard = (id: number) =>
    {
        return new Promise<JsonStandard<Flashcard>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<Flashcard>(`/flashcards/${id}`, {
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

    const updatePartialFlashcard = (id: number, updatedElement: Partial<Flashcard>) =>
    {
        return new Promise<JsonStandard<Flashcard>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<Flashcard>(`/flashcards/${id}`, {
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

    const updateFlashcard = (id: number, updatedElement: Flashcard) =>
    {
        return updatePartialFlashcard(id, updatedElement);
    };

    const createFlashcard = (unitId: number, unit: Pick<Flashcard, "front" | "back" | "details" | "favorite">) =>
    {
        return new Promise<JsonStandard<Flashcard>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<Flashcard>("/flashcards", {
                method: "POST",
                body: {
                    ...unit,
                    unit: unitId
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

    const deleteFlashcard = (id: number) =>
    {
        return new Promise<JsonStandard<null>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<null>(`/flashcards/${id}`, {
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
        getFlashcardsByUnit,
        getFlashcards,
        getFlashcard,
        createFlashcard,
        updateFlashcard,
        updatePartialFlashcard,
        deleteFlashcard
    };
};
