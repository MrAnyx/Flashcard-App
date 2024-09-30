import { Duration } from "luxon";

export default (milliseconds: number) =>
{
    const duration = Duration.fromMillis(milliseconds).shiftTo("hours", "minutes", "seconds");

    let formatString = "";

    if (duration.hours > 0)
    {
        formatString += "h'h' "; // Add hours if present
    }
    if (duration.minutes > 0)
    {
        formatString += "m'm' "; // Add minutes if present
    }

    if (duration.seconds >= 1)
    {
        // Always display seconds
        formatString += "s's'";
    }
    else
    {
        return "<1s";
    }

    return duration.toFormat(formatString.trim());
};
