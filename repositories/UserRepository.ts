import { AbstractRepository } from "./AbstractRepository";
import type { User, UserExtended } from "~/types/entity";
import type { JsonStandard } from "~/types/request";
import type { SettingName } from "~/types/settings";

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

    async updatePartialMe(updatedElement: Partial<UserExtended>)
    {
        return this.fetch<JsonStandard<User>>(`/users/me`, {
            method: "PATCH",
            body: {
                ...updatedElement
            }
        });
    };

    async updateMe(updatedElement: UserExtended)
    {
        return this.updatePartialMe(updatedElement);
    };

    async updateSetting(name: SettingName, value: string | number | boolean)
    {
        return this.fetch<JsonStandard<User>>(`/users/settings`, {
            method: "POST",
            body: {
                name,
                value
            }
        });
    };
}
