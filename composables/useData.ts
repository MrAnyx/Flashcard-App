export default () =>
{
    const topic = useTopic();
    const unit = useUnit();
    const flashcard = useFlashcard();
    const user = useUser();
    const auth = useAuth();

    return {
        topic,
        unit,
        flashcard,
        user,
        auth
    };
};
