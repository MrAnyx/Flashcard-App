export type ShortcutItem = {
    shortcut: string[];
    global: boolean;
    commandPalette: boolean;
    usingInput: boolean;
    name: string;
    description: string;
    icon?: string;
    action?: (() => void | Promise<void>);
};

export type ShortcutSection = {
    section: string;
    shortcuts: Record<string, ShortcutItem>;
};
