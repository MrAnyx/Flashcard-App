import { nanoid } from "nanoid";

export default (length: number = 20) =>
{
    return nanoid(length);
};
