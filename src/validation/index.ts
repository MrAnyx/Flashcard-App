import { PasswordStrength, estimateStrength } from "@/services/password";

export const passwordVeryString = (strength: PasswordStrength) => (value: string) => estimateStrength(value) === strength;
