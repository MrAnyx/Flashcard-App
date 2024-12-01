import { AuthRepository } from "~/repositories/AuthRepository";
import { FlashcardRepository } from "~/repositories/FlashcardRepository";
import { TopicRepository } from "~/repositories/TopicRepository";
import { UnitRepository } from "~/repositories/UnitRepository";
import { UserRepository } from "~/repositories/UserRepository";
import { ReviewRepository } from "~/repositories/ReviewRepository";
import { SessionRepository } from "~/repositories/SessionRepository";

export const useRepository = () =>
{
    return {
        topic: new TopicRepository(),
        unit: new UnitRepository(),
        flashcard: new FlashcardRepository(),
        user: new UserRepository(),
        auth: new AuthRepository(),
        review: new ReviewRepository(),
        session: new SessionRepository()
    };
};
