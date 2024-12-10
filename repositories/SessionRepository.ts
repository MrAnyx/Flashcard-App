import { AbstractRepository } from "./AbstractRepository";
import type { Filter, Pagination } from "~/types/core";
import type { SessionCountCriteria } from "~/types/countCriteria";
import type { Period } from "~/types/period";
import type { Session } from "~/types/entity";
import type { Paginated } from "~/types/request";

export class SessionRepository extends AbstractRepository
{
    async findAll(pagination: Partial<Pagination>, filter: Filter | null = null)
    {
        return this.fetch<Paginated<Session[]>>(`/sessions`, {
            method: "GET",
            query: {
                ...pagination,
                ...(filter ?? {})
            }
        });
    };

    async stop(id: number)
    {
        return this.fetch<Session>(`/sessions/${id}/stop`, {
            method: "POST",
        });
    }

    async count(criteria: SessionCountCriteria = "all", period: Period = "all")
    {
        return this.fetch<number>(`/sessions/count/${criteria}`, {
            method: "GET",
            query: {
                period
            }
        });
    }

    async countGroupByDate()
    {
        return this.fetch<{ date: string; total: number }[]>("/sessions/count/group_by_date", {
            method: "GET",
            query: {
                period: "last_30_days"
            }
        });
    }
}
