import { AbstractRepository } from "./AbstractRepository";
import type { Pagination } from "~/types/core";
import type { Flashcard } from "~/types/entity";
import type { JsonStandard } from "~/types/request";

export class FlashcardRepository extends AbstractRepository
{
    async getFlashcardsByUnit(unitId: number, pagination: Pagination)
    {
        return this.fetch<JsonStandard<Flashcard[]>>(`/units/${unitId}/flashcards`, {
            method: "GET",
            query: {
                ...pagination
            }
        });
    };

    async getFlashcards(pagination: Pagination)
    {
        return this.fetch<JsonStandard<Flashcard[]>>(`/flashcards`, {
            method: "GET",
            query: {
                ...pagination
            }
        });
    };

    async getFlashcard(id: number)
    {
        return this.fetch<JsonStandard<Flashcard>>(`/flashcards/${id}`, {
            method: "GET"
        });
    };

    async updatePartialFlashcard(id: number, updatedElement: Partial<Flashcard>)
    {
        return this.fetch<JsonStandard<Flashcard>>(`/flashcards/${id}`, {
            method: "PATCH",
            body: {
                ...updatedElement
            }
        });
    };

    async updateFlashcard(id: number, updatedElement: Flashcard)
    {
        return this.updatePartialFlashcard(id, updatedElement);
    };

    async createFlashcard(unitId: number, unit: Pick<Flashcard, "front" | "back" | "details" | "favorite">)
    {
        return this.fetch<JsonStandard<Flashcard>>("/flashcards", {
            method: "POST",
            body: {
                ...unit,
                unit: unitId
            }
        });
    };

    async deleteFlashcard(id: number)
    {
        return this.fetch<JsonStandard<null>>(`/flashcards/${id}`, {
            method: "DELETE"
        });
    };

    async resetFlashcard(id: number)
    {
        return this.fetch<JsonStandard<null>>(`/flashcards/${id}/reset`, {
            method: "POST"
        });
    };

    async resetAllFlashcards()
    {
        return this.fetch<JsonStandard<null>>(`/flashcards/reset`, {
            method: "POST"
        });
    };

    async countFlashcards()
    {
        return this.fetch<JsonStandard<number>>(`/flashcards/count`, {
            method: "GET"
        });
    };

    async countFlashcardsToReview()
    {
        return this.fetch<JsonStandard<number>>(`/flashcards/reviews/count`, {
            method: "GET"
        });
    };
}
