import type { JsonStandard } from "~/types/request";

export default () =>
{
    const deleteMe = () =>
    {
        return new Promise<JsonStandard<null>>(async (resolve, reject) =>
        {
            const { data, error } = await useApi<null>(`/users/me`, {
                method: "DELETE"
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
        deleteMe
    };
};
