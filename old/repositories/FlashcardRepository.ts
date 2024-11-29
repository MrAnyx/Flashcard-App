import { AbstractRepository } from "./AbstractRepository";
import type { Pagination } from "~/types/core";
import type { FlashcardCountCriteria } from "~/types/countCriteria";
import type { Flashcard, Session } from "~/types/entity";
import type { JsonStandard } from "~/types/request";

export class FlashcardRepository extends AbstractRepository
{
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

    async create(unitId: number, unit: Partial<Flashcard>)
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

    async findByUnit(unitId: number, pagination: Pagination)
    {
        return this.fetch<JsonStandard<Flashcard[]>>(`/units/${unitId}/flashcards`, {
            method: "GET",
            query: {
                ...pagination
            }
        });
    };

    async review(id: number, gradeType: number, sessionId: number)
    {
        return this.fetch<JsonStandard<null>>(`/flashcards/${id}/review`, {
            method: "POST",
            body: {
                grade: gradeType,
                session: sessionId
            }
        });
    };

    async resetAll()
    {
        return this.fetch<JsonStandard<null>>(`/flashcards/reset`, {
            method: "POST"
        });
    };

    async reset(id: number)
    {
        return this.fetch<JsonStandard<null>>(`/flashcards/${id}/reset`, {
            method: "POST"
        });
    };

    async session()
    {
        return this.fetch<JsonStandard<{ session: Session; flashcards: Flashcard[] }>>(`/flashcards/session`, {
            method: "GET"
        });
    };

    async count(criteria: FlashcardCountCriteria = "all")
    {
        return this.fetch<JsonStandard<number>>(`/flashcards/count`, {
            method: "GET",
            query: {
                criteria
            }
        });
    };

    async averageGrade()
    {
        return this.fetch<JsonStandard<number>>(`/flashcards/averageGrade`, {
            method: "GET"
        });
    };
}
