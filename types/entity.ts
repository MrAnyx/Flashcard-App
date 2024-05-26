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
