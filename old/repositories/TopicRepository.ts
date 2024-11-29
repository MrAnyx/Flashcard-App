import { AbstractRepository } from "./AbstractRepository";
import type { Flashcard, Session, Topic } from "~/types/entity";
import type { Pagination } from "~/types/core";
import type { JsonStandard } from "~/types/request";
import type { TopicCountCriteria } from "~/types/countCriteria";

export class TopicRepository extends AbstractRepository
{
    async findAll(pagination: Pagination)
    {
        return this.fetch<JsonStandard<Topic[]>>("/topics", {
            method: "GET",
            query: {
                ...pagination
            }
        });
    };

    async find(id: number)
    {
        return this.fetch<JsonStandard<Topic>>(`/topics/${id}`, {
            method: "GET"
        });
    };

    async create(topic: Partial<Topic>)
    {
        return this.fetch<JsonStandard<Topic>>("/topics", {
            method: "POST",
            body: {
                ...topic
            }
        });
    };

    async delete(id: number)
    {
        return this.fetch<JsonStandard<null>>(`/topics/${id}`, {
            method: "DELETE"
        });
    };

    async partialUpdate(id: number, updatedElement: Partial<Topic>)
    {
        return this.fetch<JsonStandard<Topic>>(`/topics/${id}`, {
            method: "PATCH",
            body: {
                ...updatedElement
            }
        });
    };

    async update(id: number, updatedElement: Topic)
    {
        return this.partialUpdate(id, updatedElement);
    };

    async reset(id: number)
    {
        return this.fetch<JsonStandard<null>>(`/topics/${id}/reset`, {
            method: "PATCH"
        });
    };

    async session(id: number)
    {
        return this.fetch<JsonStandard<{ session: Session; flashcards: Flashcard[] }>>(`/topics/${id}/session`, {
            method: "GET"
        });
    };

    async findRecent()
    {
        return this.fetch<JsonStandard<Topic[]>>(`/topics/recent`, {
            method: "GET"
        });
    }

    async count(criteria: TopicCountCriteria = "all")
    {
        return this.fetch<JsonStandard<number>>(`/topics/count`, {
            method: "GET",
            query: {
                criteria
            }
        });
    }
}
