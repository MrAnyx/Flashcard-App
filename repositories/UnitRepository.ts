import { AbstractRepository } from "./AbstractRepository";
import type { Unit } from "~/types/entity";
import type { Pagination } from "~/types/core";
import type { UnitCountCriteria } from "~/types/countCriteria";
import type { FlashcardSession } from "~/types/session";
import type { Paginated } from "~/types/request";

export class UnitRepository extends AbstractRepository
{
    async findAll(pagination: Pagination)
    {
        return this.fetch<Paginated<Unit[]>>(`/units`, {
            method: "GET",
            query: {
                ...pagination
            }
        });
    };

    async find(id: number)
    {
        return this.fetch<Unit>(`/units/${id}`, {
            method: "GET"
        });
    };

    async create(topicId: number, unit: Partial<Unit>)
    {
        return this.fetch<Unit>("/units", {
            method: "POST",
            body: {
                ...unit,
                topic: topicId
            }
        });
    };

    async delete(id: number)
    {
        return this.fetch<null>(`/units/${id}`, {
            method: "DELETE"
        });
    };

    async partialUpdate(id: number, updatedElement: Partial<Unit>)
    {
        return this.fetch<Unit>(`/units/${id}`, {
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
        return this.fetch<Unit[]>(`/topics/${topicId}/units`, {
            method: "GET",
            query: {
                ...pagination
            }
        });
    };

    async reset(id: number)
    {
        return this.fetch<null>(`/units/${id}/reset`, {
            method: "PATCH"
        });
    };

    async session(id: number)
    {
        return this.fetch<FlashcardSession>(`/units/${id}/session`, {
            method: "GET"
        });
    };

    async findRecents()
    {
        return this.fetch<Unit[]>(`/units/recent`, {
            method: "GET"
        });
    };

    async recentByTopic(id: number)
    {
        return this.fetch<Paginated<Unit[]>>(`/topics/${id}/units/recent`, {
            method: "GET"
        });
    };

    async count(criteria: UnitCountCriteria = "all")
    {
        return this.fetch<number>(`/units/count/${criteria}`, {
            method: "GET",
        });
    };
}
