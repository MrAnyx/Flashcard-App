import { AbstractRepository } from "./AbstractRepository";
import type { Flashcard, Session, Unit } from "~/types/entity";
import type { Pagination } from "~/types/core";
import type { JsonStandard } from "~/types/request";
import type { UnitCountCriteria } from "~/types/countCriteria";

export class UnitRepository extends AbstractRepository
{
    async findAll(pagination: Pagination)
    {
        return this.fetch<JsonStandard<Unit[]>>(`/units`, {
            method: "GET",
            query: {
                ...pagination
            }
        });
    };

    async find(id: number)
    {
        return this.fetch<JsonStandard<Unit>>(`/units/${id}`, {
            method: "GET"
        });
    };

    async create(topicId: number, unit: Partial<Unit>)
    {
        return this.fetch<JsonStandard<Unit>>("/units", {
            method: "POST",
            body: {
                ...unit,
                topic: topicId
            }
        });
    };

    async delete(id: number)
    {
        return this.fetch<JsonStandard<null>>(`/units/${id}`, {
            method: "DELETE"
        });
    };

    async partialUpdate(id: number, updatedElement: Partial<Unit>)
    {
        return this.fetch<JsonStandard<Unit>>(`/units/${id}`, {
            method: "PATCH",
            body: {
                ...updatedElement
            }
        });
    };

    async update(id: number, updatedElement: Unit)
    {
        return this.partialUpdate(id, updatedElement);
    };

    async findByTopic(topicId: number, pagination: Pagination)
    {
        return this.fetch<JsonStandard<Unit[]>>(`/topics/${topicId}/units`, {
            method: "GET",
            query: {
                ...pagination
            }
        });
    };

    async reset(id: number)
    {
        return this.fetch<JsonStandard<null>>(`/units/${id}/reset`, {
            method: "PATCH"
        });
    };

    async session(id: number)
    {
        return this.fetch<JsonStandard<{ session: Session; flashcards: Flashcard[] }>>(`/units/${id}/session`, {
            method: "GET"
        });
    };

    async findRecents()
    {
        return this.fetch<JsonStandard<Unit[]>>(`/units/recent`, {
            method: "GET"
        });
    };

    async recentByTopic(id: number)
    {
        return this.fetch<JsonStandard<Unit[]>>(`/topics/${id}/units/recent`, {
            method: "GET"
        });
    };

    async count(criteria: UnitCountCriteria = "all")
    {
        return this.fetch<JsonStandard<number>>(`/units/count`, {
            method: "GET",
            query: {
                criteria
            }
        });
    };
}
