export default (num: number): string =>
{
    const locale = browserLocale();
    const formatter = Intl.NumberFormat(locale, {
        maximumFractionDigits: 2,
        notation: "compact"
    });

    return formatter.format(num);
};
