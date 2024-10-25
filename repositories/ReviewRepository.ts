import { AbstractRepository } from "./AbstractRepository";
import type { ReviewCountCriteria } from "~/types/countCriteria";
import type { JsonStandard } from "~/types/request";

export class ReviewRepository extends AbstractRepository
{
    async count(criteria: ReviewCountCriteria = "only_valid")
    {
        return this.fetch<JsonStandard<number>>("/reviews/count", {
            method: "GET",
            query: {
                criteria
            }
        });
    }
}
