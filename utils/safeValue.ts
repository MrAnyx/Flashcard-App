export default <T>(value: T | null | undefined, fallback: T): T =>
{
    return value ? value : fallback;
};
