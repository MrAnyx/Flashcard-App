import { AbstractRepository } from "./AbstractRepository";
import type { ReviewCountCriteria } from "~/types/countCriteria";
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
}
