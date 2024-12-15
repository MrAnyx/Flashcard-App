export type Job = {
    name: string;
    schedule: string;
    handler: () => Promise<void> | void;
};
