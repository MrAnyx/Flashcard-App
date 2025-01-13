import { DateTime } from "luxon";
import type { Flashcard } from "~/types/entity";

export default (flashcard: Flashcard) =>
{
    return flashcard.nextReview && datetimeCompare(DateTime.now().toISO(), flashcard.nextReview) === "after";
};
