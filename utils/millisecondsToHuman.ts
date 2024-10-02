import { Duration } from "luxon";

export default (milliseconds: number) =>
{
    if (milliseconds <= 1000)
    {
        return "<1s";
    }

    const duration = Duration.fromMillis(milliseconds).shiftToAll();

    let formatString = "";

    if (duration.hours > 0)
    {
        formatString += "h'h' "; // Add hours if present
    }
    if (duration.minutes > 0)
    {
        formatString += "m'm' "; // Add minutes if present
    }
    if (duration.seconds > 0)
    {
        formatString += "s's'"; // Add seconds if present
    }

    return duration.toFormat(formatString.trim());
};
