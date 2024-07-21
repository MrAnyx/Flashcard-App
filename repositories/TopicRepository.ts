import { AbstractRepository } from "./AbstractRepository";
import type { Topic } from "~/types/entity";
import type { Pagination } from "~/types/core";
import type { JsonStandard } from "~/types/request";

export class TopicRepository extends AbstractRepository
{
    async getTopics(pagination: Pagination)
    {
        return this.fetch<JsonStandard<Topic[]>>("/topics", {
            method: "GET",
            query: {
                ...pagination
            }
        });
    };

    async getTopic(id: number)
    {
        return this.fetch<JsonStandard<Topic>>(`/topics/${id}`, {
            method: "GET"
        });
    };

    async updatePartialTopic(id: number, updatedElement: Partial<Topic>)
    {
        return this.fetch<JsonStandard<Topic>>(`/topics/${id}`, {
            method: "PATCH",
            body: {
                ...updatedElement
            }
        });
    };

    async updateTopic(id: number, updatedElement: Topic)
    {
        return this.updatePartialTopic(id, updatedElement);
    };

    async createTopic(topic: Pick<Topic, "name" | "description" | "favorite">)
    {
        return this.fetch<JsonStandard<Topic>>("/topics", {
            method: "POST",
            body: {
                ...topic
            }
        });
    };

    async deleteTopic(id: number)
    {
        return this.fetch<JsonStandard<null>>(`/topics/${id}`, {
            method: "DELETE"
        });
    };

    async resetTopic(id: number)
    {
        return this.fetch<JsonStandard<null>>(`/topics/${id}/flashcards/reset`, {
            method: "PATCH"
        });
    };
}
