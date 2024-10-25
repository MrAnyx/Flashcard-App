import { AbstractRepository } from "./AbstractRepository";
import type { Pagination } from "~/types/core";
import type { SessionCountCriteria } from "~/types/countCriteria";
import type { Session } from "~/types/entity";
import type { JsonStandard } from "~/types/request";

export class SessionRepository extends AbstractRepository
{
    async findAll(pagination: Pagination)
    {
        return this.fetch<JsonStandard<Session[]>>(`/sessions`, {
            method: "GET",
            query: {
                ...pagination
            }
        });
    };

    async stop(id: number)
    {
        return this.fetch<JsonStandard<Session>>(`/sessions/${id}/stop`, {
            method: "POST",
        });
    }

    async count(criteria: SessionCountCriteria = "all")
    {
        return this.fetch<JsonStandard<number>>("/sessions/count", {
            method: "GET",
            query: {
                criteria
            }
        });
    }
}
