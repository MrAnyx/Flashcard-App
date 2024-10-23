import type { SettingName } from "./settings";

export type Role = "ROLE_USER" | "ROLE_ADMIN";

export type User = {
    id: number;
    email: string;
    username: string;
    token: string;
    createdAt: string;
    updatedAt: string;
    roles: Role[];
    premium: boolean;
    premiumAt: string;
    settings: Record<SettingName, string | number | boolean>;
};

export type UserExtended = User & {
    password: string;
};

export type Topic = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    favorite: boolean;
};

export type Unit = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    favorite: boolean;
    topic: Topic;
};

export type Flashcard = {
    id: number;
    createdAt: string;
    updatedAt: string;
    front: string;
    back: string;
    details: string;
    nextReview: string;
    previousReview: string;
    state: number;
    difficulty: number | null;
    stability: number | null;
    favorite: boolean;
    help: string | null;
    unit: Unit;
};

export type Auth = {
    username: string;
    email: string;
    identifier: string;
    password: string;
};

export type ResetPassword = {
    identifier: string;
    token: string;
    password: string;
};

export type Session = {
    id: number;
    startedAt: string;
    endedAt: string;
    totalReviews: number | null;
};

export const GradeType = {
    again: 1,
    hard: 2,
    good: 3,
    easy: 4
};
