export abstract class AbstractRepository
{
    protected fetch;

    constructor()
    {
        this.fetch = useNuxtApp().$apiFetch;
    }
}
