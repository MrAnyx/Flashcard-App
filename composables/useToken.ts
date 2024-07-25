import { DateTime } from "luxon";

export const useToken = () =>
{
    return useCookie<string>("token", {
        expires: DateTime.now().plus({ days: 90 }).toJSDate(), // 90 days
        maxAge: 60 * 60 * 24 * 90,
        priority: "medium",
        secure: true,
        sameSite: true,
    });
};
