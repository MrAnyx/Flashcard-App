export default (color: string, brightness: number): string =>
{
    const formattedColor = `--color-${color}-${brightness}`;

    return `rgb(${useCssVar(formattedColor).value.split(" ")})`;
};
