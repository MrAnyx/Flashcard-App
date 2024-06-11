export default () =>
{
    const topic = useTopic();
    const unit = useUnit();

    return {
        topic,
        unit
    };
};
