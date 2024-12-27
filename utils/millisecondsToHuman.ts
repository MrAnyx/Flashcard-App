import { Duration } from "luxon";

export default (milliseconds: number) =>
{
    if (milliseconds <= 1000)
    {
        return "<1s";
    }

    const duration = Duration.fromMillis(milliseconds).shiftToAll();

    const parts = [];
    if (duration.hours > 0)
    {
        parts.push(`${duration.hours}h`);
    }
    if (duration.minutes > 0)
    {
        parts.push(`${duration.minutes}m`);
    }
    if (duration.seconds > 0)
    {
        parts.push(`${duration.seconds}s`);
    }

    return parts.join(" ");
};
