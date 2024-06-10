import type { Topic } from "~/types/entity";

type State = {
    recents: Topic[];
    topics: Topic[];
    total: number;
};

export const useTopicStore = defineStore("topic", {
    state: (): State => ({
        recents: [],
        topics: [],
        total: 0
    }),
    actions: {
        addTopic(topic: Topic)
        {
            this.topics = [topic, ...this.topics];
            this.incrementTotal();
        },
        deleteTopic(topic: Topic)
        {
            const topicToRemove = this.topics.findIndex(t => t.id === topic.id);
            this.topics.splice(topicToRemove, 1);
            this.decrementTotal();
        },
        updateTopic(id: number, topic: Partial<Topic>)
        {
            const topicToUpdate = this.topics.findIndex(t => t.id === id);
            if (topicToUpdate !== -1)
            {
                const previousTopic = this.topics[topicToUpdate];
                this.topics[topicToUpdate] = {
                    ...previousTopic,
                    ...topic
                };
            }
        },
        incrementTotal()
        {
            this.total++;
        },
        decrementTotal()
        {
            this.total--;
        }
    },
    getters: {}
});
