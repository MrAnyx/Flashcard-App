export type Role = "ROLE_USER" | "ROLE_ADMIN";

export type User = {
    id: number;
    email: string;
    username: string;
    token: string;
    createdAt: string;
    updatedAt: string;
    roles: Role[];
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
    difficulty: number;
    stability: number;
    favorite: boolean;
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
