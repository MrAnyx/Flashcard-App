export default <T>(value: T | undefined, fallback: T): T =>
{
    return value !== undefined ? value : fallback;
};
