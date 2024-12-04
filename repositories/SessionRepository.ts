import { AbstractRepository } from "./AbstractRepository";
import type { Pagination } from "~/types/core";
import type { SessionCountCriteria } from "~/types/countCriteria";
import type { Period } from "~/types/period";
import type { Session } from "~/types/entity";

export class SessionRepository extends AbstractRepository
{
    async findAll(pagination: Pagination)
    {
        return this.fetch<Session[]>(`/sessions`, {
            method: "GET",
            query: {
                ...pagination
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
        return this.fetch<number>("/sessions/count", {
            method: "GET",
            query: {
                criteria,
                period
            }
        });
    }

    async countGroupByDate()
    {
        return this.fetch<{ date: string; total: number }[]>("/sessions/count", {
            method: "GET",
            query: {
                criteria: "group_by_date",
                period: "last_30_days"
            }
        });
    }
}
