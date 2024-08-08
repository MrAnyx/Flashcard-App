import { AbstractRepository } from "./AbstractRepository";
import type { Unit } from "~/types/entity";
import type { Pagination } from "~/types/core";
import type { JsonStandard } from "~/types/request";

export class UnitRepository extends AbstractRepository
{
    async getUnitsByTopic(topicId: number, pagination: Pagination)
    {
        return this.fetch<JsonStandard<Unit[]>>(`/topics/${topicId}/units`, {
            method: "GET",
            query: {
                ...pagination
            }
        });
    };

    async getUnits(pagination: Pagination)
    {
        return this.fetch<JsonStandard<Unit[]>>(`/units`, {
            method: "GET",
            query: {
                ...pagination
            }
        });
    };

    async getUnit(id: number)
    {
        return this.fetch<JsonStandard<Unit>>(`/units/${id}`, {
            method: "GET"
        });
    };

    async updatePartialUnit(id: number, updatedElement: Partial<Unit>)
    {
        return this.fetch<JsonStandard<Unit>>(`/units/${id}`, {
            method: "PATCH",
            body: {
                ...updatedElement
            }
        });
    };

    async updateUnit(id: number, updatedElement: Unit)
    {
        return this.updatePartialUnit(id, updatedElement);
    };

    async createUnit(topicId: number, unit: Pick<Unit, "name" | "description" | "favorite">)
    {
        return this.fetch<JsonStandard<Unit>>("/units", {
            method: "POST",
            body: {
                ...unit,
                topic: topicId
            }
        });
    };

    async deleteUnit(id: number)
    {
        return this.fetch<JsonStandard<null>>(`/units/${id}`, {
            method: "DELETE"
        });
    };

    async resetUnit(id: number)
    {
        return this.fetch<JsonStandard<null>>(`/units/${id}/reset`, {
            method: "PATCH"
        });
    };

    async countUnits()
    {
        return this.fetch<JsonStandard<number>>(`/units/count`, {
            method: "GET"
        });
    };
}
