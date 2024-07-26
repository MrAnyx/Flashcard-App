export const useToken = () =>
{
    return useCookie("token", {
        // On web browsers like Brave, the maxAge of this cookie will be set to 7 days even though the maxAge set here is 90 days.
        maxAge: 60 * 60 * 24 * 90,
        priority: "medium",
        secure: true,
        sameSite: true,
        watch: true
    });
};
