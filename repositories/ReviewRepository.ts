import { AbstractRepository } from "./AbstractRepository";
import type { ReviewCountCriteria } from "~/types/countCriteria";
import type { Review } from "~/types/entity";
import type { Period } from "~/types/period";
import type { JsonStandard } from "~/types/request";

export class ReviewRepository extends AbstractRepository
{
    async count(criteria: ReviewCountCriteria = "only_valid", period: Period = "all")
    {
        return this.fetch<JsonStandard<number>>("/reviews/count", {
            method: "GET",
            query: {
                criteria,
                period
            }
        });
    }

    async findAllBySession(sessionId: number)
    {
        return this.fetch<JsonStandard<Review[]>>(`/sessions/${sessionId}/reviews`, {
            method: "GET",
        });
    }

    async countGroupByDate()
    {
        return this.fetch<JsonStandard<{ date: string; total: number }[]>>("/reviews/count", {
            method: "GET",
            query: {
                criteria: "group_by_date",
                period: "last_30_days"
            }
        });
    }
}
