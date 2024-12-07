import type { RouteRecordNameGeneric } from "vue-router";

export default (defaultRouteName: RouteRecordNameGeneric) =>
{
    const route = useRoute();

    if (route.query.forward)
    {
        return navigateTo(route.query.forward as string);
    }
    else
    {
        return navigateTo({ name: defaultRouteName });
    }
};
