import { AbstractRepository } from "./AbstractRepository";
import type { JsonStandard } from "~/types/request";

export class ReviewRepository extends AbstractRepository
{
    async countReviews(withReset: boolean = false)
    {
        return this.fetch<JsonStandard<number>>("/reviews/count", {
            method: "GET",
            query: {
                withReset
            }
        });
    }
}
