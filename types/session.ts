export type Collection = {
    type: "topic" | "unit";
    id: number;
};

export type Answer = {
    grade: number;
    timestamp: number;
    duration: number; // In milliseconds
};
