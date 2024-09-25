import { AbstractRepository } from "./AbstractRepository";
import type { Pagination } from "~/types/core";
import type { Flashcard } from "~/types/entity";
import type { JsonStandard } from "~/types/request";

export class FlashcardRepository extends AbstractRepository
{
    async findByUnit(unitId: number, pagination: Pagination)
    {
        return this.fetch<JsonStandard<Flashcard[]>>(`/units/${unitId}/flashcards`, {
            method: "GET",
            query: {
                ...pagination
            }
        });
    };

    async findAll(pagination: Pagination)
    {
        return this.fetch<JsonStandard<Flashcard[]>>(`/flashcards`, {
            method: "GET",
            query: {
                ...pagination
            }
        });
    };

    async find(id: number)
    {
        return this.fetch<JsonStandard<Flashcard>>(`/flashcards/${id}`, {
            method: "GET"
        });
    };

    async partialUpdate(id: number, updatedElement: Partial<Flashcard>)
    {
        return this.fetch<JsonStandard<Flashcard>>(`/flashcards/${id}`, {
            method: "PATCH",
            body: {
                ...updatedElement
            }
        });
    };

    async update(id: number, updatedElement: Flashcard)
    {
        return this.partialUpdate(id, updatedElement);
    };

    async create(unitId: number, unit: Pick<Flashcard, "front" | "back" | "details" | "favorite">)
    {
        return this.fetch<JsonStandard<Flashcard>>("/flashcards", {
            method: "POST",
            body: {
                ...unit,
                unit: unitId
            }
        });
    };

    async delete(id: number)
    {
        return this.fetch<JsonStandard<null>>(`/flashcards/${id}`, {
            method: "DELETE"
        });
    };

    async reset(id: number)
    {
        return this.fetch<JsonStandard<null>>(`/flashcards/${id}/reset`, {
            method: "POST"
        });
    };

    async resetAll()
    {
        return this.fetch<JsonStandard<null>>(`/flashcards/reset`, {
            method: "POST"
        });
    };

    async count()
    {
        return this.fetch<JsonStandard<number>>(`/flashcards/count`, {
            method: "GET"
        });
    };

    async countToReview()
    {
        return this.fetch<JsonStandard<number>>(`/flashcards/reviews/count`, {
            method: "GET"
        });
    };

    async countCorrect()
    {
        return this.fetch<JsonStandard<number>>(`/flashcards/correct/count`, {
            method: "GET"
        });
    };

    async averageGrade()
    {
        return this.fetch<JsonStandard<number>>(`/flashcards/averageGrade`, {
            method: "GET"
        });
    };
}
