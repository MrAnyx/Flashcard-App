import { DateTime } from "luxon";

export default (datetimeStr: string, format: Intl.DateTimeFormatOptions) =>
{
    return DateTime.fromISO(datetimeStr).toLocaleString(format);
};
