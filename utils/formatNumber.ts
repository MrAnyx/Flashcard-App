export default (num: number) =>
{
    const locale = browserLocale();
    const formatter = Intl.NumberFormat(locale, {
        maximumFractionDigits: 2,
        notation: "compact"
    });

    return formatter.format(num);
};
