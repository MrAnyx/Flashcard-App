import type { Auth, ResetPassword, User } from "~/types/entity";
import type { JsonStandard } from "~/types/request";

export default () =>
{
    const login = (authData: Pick<Auth, "identifier" | "password">) =>
    {
        return new Promise<JsonStandard<User>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<User>("/auth/login", {
                method: "POST",
                body: {
                    identifier: authData.identifier,
                    password: authData.password
                }
            });

            if (!error.value)
            {
                resolve(data.value!);
            }
            else
            {
                switch (error.value.statusCode)
                {
                    case 401:
                        useStandardToast("unauthorized");
                        break;
                    default:
                        useStandardToast("error");
                        break;
                }

                reject(error);
            }
        });
    };

    const requestResetPassword = (authData: Pick<ResetPassword, "identifier">) =>
    {
        return new Promise<JsonStandard<null>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<null>("/auth/reset-password/request", {
                method: "POST",
                body: {
                    identifier: authData.identifier,
                }
            });

            if (!error.value)
            {
                resolve(data.value!);
            }
            else
            {
                switch (error.value.statusCode)
                {
                    case 401:
                        useStandardToast("unauthorized");
                        break;
                    default:
                        useStandardToast("error");
                        break;
                }

                reject(error);
            }
        });
    };

    const proceedResetPassword = (authData: Pick<ResetPassword, "token" | "password">) =>
    {
        return new Promise<JsonStandard<User>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<User>("/auth/reset-password/proceed", {
                method: "POST",
                body: {
                    token: authData.token,
                    password: authData.password,
                }
            });

            if (!error.value)
            {
                resolve(data.value!);
            }
            else
            {
                switch (error.value.statusCode)
                {
                    case 401:
                        useStandardToast("unauthorized");
                        break;
                    default:
                        useStandardToast("error");
                        break;
                }

                reject(error);
            }
        });
    };

    return {
        login,
        requestResetPassword,
        proceedResetPassword
    };
};
