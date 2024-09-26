export type ShortcutItem = {
    shortcut: string[];
    global: boolean;
    usingInput: boolean;
    name: string;
    description: string;
    action?: (() => void | Promise<void>);
};

export type ShortcutSection = {
    section: string;
    shortcuts: Record<string, ShortcutItem>;
};
