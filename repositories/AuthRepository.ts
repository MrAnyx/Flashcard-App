import { AbstractRepository } from "./AbstractRepository";
import type { Auth, ResetPassword, User } from "~/types/entity";

export class AuthRepository extends AbstractRepository
{
    async login(authData: Pick<Auth, "identifier" | "rawPassword">)
    {
        return this.fetch<User>("/auth/login", {
            method: "POST",
            body: {
                identifier: authData.identifier,
                password: authData.rawPassword
            }
        });
    }

    async register(authData: Pick<Auth, "email" | "rawPassword" | "username">)
    {
        return this.fetch<User>("/auth/register", {
            method: "POST",
            body: {
                email: authData.email,
                username: authData.username,
                rawPassword: authData.rawPassword
            }
        });
    }

    async requestPasswordReset(authData: Pick<ResetPassword, "identifier">)
    {
        return this.fetch<null>("/auth/reset-password/request", {
            method: "POST",
            body: {
                identifier: authData.identifier,
            }
        });
    }

    async proceedResetPassword(authData: Pick<ResetPassword, "token" | "password">)
    {
        return this.fetch<User>("/auth/reset-password/proceed", {
            method: "POST",
            body: {
                token: authData.token,
                rawPassword: authData.password,
            }
        });
    };
}
