import { AbstractRepository } from "./AbstractRepository";
import type { JsonStandard } from "~/types/request";

export class UserRepository extends AbstractRepository
{
    async deleteMe()
    {
        return this.fetch<JsonStandard<null>>(`/users/me`, {
            method: "DELETE"
        });
    };
}
