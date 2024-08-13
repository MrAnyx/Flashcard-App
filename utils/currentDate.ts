export default () =>
{
    const locale = browserLocale();
    const formatter = new Intl.DateTimeFormat(locale, {
        dateStyle: "full",
        timeStyle: "long",
    });

    return formatter.format(new Date());
};
