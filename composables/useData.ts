export default () =>
{
    const topic = useTopic();
    const unit = useUnit();
    const flashcard = useFlashcard();
    const user = useUser();

    return {
        topic,
        unit,
        flashcard,
        user
    };
};
