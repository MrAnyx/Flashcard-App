export default () =>
{
    const topic = useTopic();
    const unit = useUnit();
    const flashcard = useFlashcard();

    return {
        topic,
        unit,
        flashcard
    };
};
