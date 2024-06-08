import type { Topic } from "~/types/entity";

type State = {
    recents: Topic[];
};

export const useTopicStore = defineStore("topic", {
    state: (): State => ({
        recents: []
    }),
    actions: {
        getTopics(sort: string, order: string, page: number) {
            return new Promise(async (resolve, reject) => {
                const { data, error } = await useApi<Topic[]>("/topics", {
                    method: "GET",
                    query: {
                        sort,
                        order,
                        page
                    }
                });

                if (!error.value) {
                    resolve(data);
                } else if (error.value.statusCode === 401) {
                    useStandardToast("unauthorized");
                    reject(error);
                } else {
                    useStandardToast("error");
                    reject(error);
                }
            });
        }
    },
    getters: {}
});
