import { z } from "zod";

export const useValidationRule = () =>
{
    return {
        identifier: z
            .string()
            .min(1, "Identifier can not be blank")
            .max(180, "Identifier is too long"),

        username: z
            .string()
            .min(1, "Username can not be blank")
            .max(30, "Username is too long")
            .regex(Regex.Username, "Username contains invalid characters"),

        email: z
            .string()
            .email("Invalid email")
            .min(1, "Email can not be blank")
            .max(180, "Email is too long"),

        password: z
            .string()
            .min(8, "Password is too short")
            .regex(Regex.Password, "Password isn't valid"),

        token: z
            .string()
            .min(1, "Token can not be blank"),

        front: z.string()
            .min(1, "The front side can not be blank")
            .max(255, "The front side is too long"),

        back: z.string()
            .min(1, "The back side can not be blank")
            .max(255, "The back side is too long"),

        details: z.string()
            .max(1000, "The details is too long"),

        name: z.string()
            .min(1, "The name can not be blank")
            .max(35, "The name is too long"),

        color: z.string()
            .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color"),

        description: z.string()
            .max(300, "The description is too long")
    };
};
