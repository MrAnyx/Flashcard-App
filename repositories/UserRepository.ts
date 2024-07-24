import { AbstractRepository } from "./AbstractRepository";
import type { User } from "~/types/entity";
import type { JsonStandard } from "~/types/request";

export class UserRepository extends AbstractRepository
{
    async deleteMe()
    {
        return this.fetch<JsonStandard<null>>(`/users/me`, {
            method: "DELETE"
        });
    };

    async getMe()
    {
        return this.fetch<JsonStandard<User>>(`/users/me`, {
            method: "GET"
        });
    };
}
