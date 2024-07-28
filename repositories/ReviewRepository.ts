import { AbstractRepository } from "./AbstractRepository";
import type { JsonStandard } from "~/types/request";
import type { Auth, ResetPassword, User } from "~/types/entity";

export class ReviewRepository extends AbstractRepository
{
    async login(authData: Pick<Auth, "identifier" | "password">)
    {
        return this.fetch<JsonStandard<User>>("/auth/login", {
            method: "POST",
            body: {
                identifier: authData.identifier,
                password: authData.password
            }
        });
    }

    async register(authData: Omit<Auth, "identifier">)
    {
        return this.fetch<JsonStandard<User>>("/auth/register", {
            method: "POST",
            body: {
                email: authData.email,
                username: authData.username,
                password: authData.password
            }
        });
    }

    async requestPasswordReset(authData: Pick<ResetPassword, "identifier">)
    {
        return this.fetch<JsonStandard<null>>("/auth/reset-password/request", {
            method: "POST",
            body: {
                identifier: authData.identifier,
            }
        });
    }

    async proceedResetPassword(authData: Pick<ResetPassword, "token" | "password">)
    {
        return this.fetch<JsonStandard<User>>("/auth/reset-password/proceed", {
            method: "POST",
            body: {
                token: authData.token,
                password: authData.password,
            }
        });
    };
}
