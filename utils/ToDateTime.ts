import { DateTime } from "luxon";

export default (datetimeStr: string) =>
{
    return DateTime.fromISO(datetimeStr);
};
