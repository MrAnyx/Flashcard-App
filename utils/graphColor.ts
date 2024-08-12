export default (color: string, brightness: number) =>
{
    const formattedColor = `--color-${color}-${brightness}`;

    return `rgb(${useCssVar(formattedColor).value.split(" ")})`;
};
