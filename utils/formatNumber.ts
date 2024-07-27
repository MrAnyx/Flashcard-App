export default (num: number) =>
{
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const formatter = Intl.NumberFormat(locale, {
        maximumFractionDigits: 2,
        notation: "compact"
    });

    return formatter.format(num);
};
