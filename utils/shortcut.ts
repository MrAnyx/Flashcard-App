import { ModalFlashcardForm, ModalSearchCommandPalette, ModalShortcuts, ModalTopicForm, ModalUnitForm } from "#components";
import type { ShortcutSection } from "~/types/shortcut";

const modal = useModal();

// Shortcuts must be unique to prevent bad behavior
export const AppShortcutSections: ShortcutSection[] = [
    {
        section: "Navigation",
        shortcuts: {
            "g-o": {
                shortcut: ["G", "O"],
                global: true,
                commandPalette: true,
                usingInput: false,
                name: "Go to overview",
                description: "Naviguate to your personal overview",
                icon: "i-tabler-layout-dashboard",
                action: async () =>
                {
                    modal.reset();
                    await navigateTo({
                        name: "overview"
                    });
                }
            },
            "g-c": {
                shortcut: ["G", "C"],
                global: true,
                commandPalette: true,
                usingInput: false,
                name: "Go to collection",
                description: "Naviguate to the collection page",
                icon: "i-tabler-table",
                action: async () =>
                {
                    modal.reset();
                    await navigateTo({
                        name: "topics"
                    });
                }
            },
            "g-p": {
                shortcut: ["G", "P"],
                global: true,
                commandPalette: true,
                usingInput: false,
                name: "Go to practice",
                description: "Naviguate to the practice page",
                icon: "i-tabler-device-gamepad-2",
                action: async () =>
                {
                    modal.reset();
                    await navigateTo({
                        name: "practice"
                    });
                }
            },
            "g-s": {
                shortcut: ["G", "S"],
                global: true,
                commandPalette: true,
                usingInput: false,
                name: "Go to settings",
                description: "Naviguate to the settings page",
                icon: "i-tabler-settings",
                action: async () =>
                {
                    modal.reset();
                    await navigateTo({
                        name: "settings-account"
                    });
                }
            },
        }
    }, {
        section: "Common",
        shortcuts: {
            ctrl_k: {
                shortcut: ["Ctrl", "K"],
                global: true,
                commandPalette: false,
                usingInput: false,
                name: "Global search",
                description: "Open search command palette",
                icon: "i-tabler-search",
                action: async () =>
                {
                    modal.reset();
                    setTimeout(() => modal.open(ModalSearchCommandPalette), 0);
                }
            },
            "?": {
                shortcut: ["?"],
                global: true,
                commandPalette: false,
                usingInput: false,
                name: "Shortcuts",
                description: "Open list of shortcuts",
                icon: "i-tabler-terminal-2",
                action: async () =>
                {
                    modal.reset();
                    setTimeout(() => modal.open(ModalShortcuts), 0);
                }
            },
            "n-s": {
                shortcut: ["N", "S"],
                global: true,
                commandPalette: true,
                usingInput: false,
                name: "New session",
                description: "Start a practice session",
                icon: "i-tabler-device-gamepad-2",
                action: async () =>
                {
                    modal.reset();
                    await startSession();
                }
            },
            "n-t": {
                shortcut: ["N", "T"],
                global: true,
                commandPalette: true,
                usingInput: false,
                name: "New topic",
                description: "Create a new topic",
                icon: "i-tabler-folder",
                action: async () =>
                {
                    modal.reset();
                    setTimeout(() => modal.open(ModalTopicForm), 0);
                }
            },
            "n-u": {
                shortcut: ["N", "U"],
                global: true,
                commandPalette: true,
                usingInput: false,
                name: "New unit",
                description: "Create a new unit",
                icon: "i-tabler-color-swatch",
                action: async () =>
                {
                    modal.reset();
                    setTimeout(() => modal.open(ModalUnitForm), 0);
                }
            },
            "n-f": {
                shortcut: ["N", "F"],
                global: true,
                commandPalette: true,
                usingInput: false,
                name: "New flashcard",
                description: "Create a new flashcard",
                icon: "i-tabler-cards",
                action: async () =>
                {
                    modal.reset();
                    setTimeout(() => modal.open(ModalFlashcardForm), 0);
                }
            },
        }
    }, {
        section: "Modal",
        shortcuts: {
            escape: {
                shortcut: ["Esc"],
                global: true,
                commandPalette: false,
                usingInput: true,
                name: "Close current modal",
                description: "Close the current modal",
                action: async () =>
                {
                    modal.reset();
                }
            },
        }
    },
];

export const AppShortcuts = Object.fromEntries(AppShortcutSections.flatMap(section => Object.entries(section.shortcuts).map(([key, value]) => [key, value])));
