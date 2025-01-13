import { DateTime } from "luxon";
import type { TimeComparator } from "~/types/date";

export default (comparator: string, needle: string): TimeComparator =>
{
    // Parse the ISO date strings into DateTime objects
    const comparatorDate = DateTime.fromISO(comparator);
    const needleDate = DateTime.fromISO(needle);

    // Check if the parsing was successful
    if (!comparatorDate.isValid || !needleDate.isValid)
    {
        throw new Error("One or both of the date-time strings are invalid.");
    }

    // Compare the dates
    if (needleDate < comparatorDate)
    {
        return "before";
    }
    else if (needleDate > comparatorDate)
    {
        return "after";
    }
    else
    {
        return "same";
    }
};
