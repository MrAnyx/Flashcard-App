import { AbstractRepository } from "./AbstractRepository";
import type { JsonStandard } from "~/types/request";

export class SessionRepository extends AbstractRepository
{
    async countSessions()
    {
        return this.fetch<JsonStandard<number>>("/sessions/count", {
            method: "GET",
        });
    }
}
