export default (num: number, word: string, plural = word + "s") =>
{
    return num < 2 ? word : plural;
};
