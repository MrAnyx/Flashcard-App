export default defineNuxtRouteMiddleware(async (to, from) =>
{
    const repository = useRepository();

    await repository.topic.findAll({
        itemsPerPage: 20, order: "ASC", page: 1, sort: "id"
    });

    useApplicationStore().initialized = true;
});
