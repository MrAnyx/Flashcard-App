import { DateTime } from "luxon";
import type { BadgeColor } from "#ui/types";

export default (datetimeStr: string): BadgeColor =>
{
    const now = DateTime.now();
    const date = DateTime.fromISO(datetimeStr);

    const normalizedNow = now.startOf("day");
    const normalizedDate = date.startOf("day");

    if (normalizedDate > normalizedNow)
    {
        return "green";
    }
    else if (normalizedDate < normalizedNow)
    {
        return "red";
    }
    else
    {
        return "orange";
    }
};
