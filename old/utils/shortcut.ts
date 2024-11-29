import { ModalFlashcardForm, ModalSearchCommandPalette, ModalSessionIntroduction, ModalShortcuts, ModalTopicForm, ModalUnitForm } from "#components";
import type { ShortcutSection } from "~/types/shortcut";

// Shortcuts must be unique to prevent bad behavior
export const AppShortcutSections: ShortcutSection[] = [
    {
        section: "Navigation",
        shortcuts: {
            "g-o": {
                shortcut: ["G", "O"],
                global: true,
                usingInput: false,
                name: "Go to overview",
                description: "Naviguate to your overview",
                action: async () =>
                {
                    useModal().close();
                    await navigateTo({
                        name: "overview"
                    });
                }
            },
            "g-c": {
                shortcut: ["G", "C"],
                global: true,
                usingInput: false,
                name: "Go to collection",
                description: "Naviguate to the collection page",
                action: async () =>
                {
                    useModal().close();
                    await navigateTo({
                        name: "topics"
                    });
                }
            },
            "g-p": {
                shortcut: ["G", "P"],
                global: true,
                usingInput: false,
                name: "Go to practice",
                description: "Naviguate to the practice page",
                action: async () =>
                {
                    useModal().close();
                    await navigateTo({
                        name: "practice"
                    });
                }
            },
            "g-s": {
                shortcut: ["G", "S"],
                global: true,
                usingInput: false,
                name: "Go to settings",
                description: "Naviguate to the settings page",
                action: async () =>
                {
                    useModal().close();
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
                usingInput: false,
                name: "Global search",
                description: "Open search command palette",
                action: () =>
                {
                    useModal().open(ModalSearchCommandPalette);
                }
            },
            "?": {
                shortcut: ["?"],
                global: true,
                usingInput: false,
                name: "Shortcuts",
                description: "Open list of shortcuts",
                action: () =>
                {
                    useModal().open(ModalShortcuts);
                }
            },
            "c-s": {
                shortcut: ["C", "S"],
                global: true,
                usingInput: false,
                name: "Start a session",
                description: "Start a session",
                action: async () =>
                {
                    const modal = useModal();
                    const authStore = useAuthStore();

                    if (authStore.getSetting("show_session_introduction"))
                    {
                        modal.open(ModalSessionIntroduction);
                    }
                    else
                    {
                        await startSession();
                        await modal.close();
                    }
                }
            },
            "c-t": {
                shortcut: ["C", "T"],
                global: true,
                usingInput: false,
                name: "Create a topic",
                description: "Create a new topic",
                action: () =>
                {
                    useModal().open(ModalTopicForm);
                }
            },
            "c-u": {
                shortcut: ["C", "U"],
                global: true,
                usingInput: false,
                name: "Create a unit",
                description: "Create a new unit",
                action: () =>
                {
                    useModal().open(ModalUnitForm);
                }
            },
            "c-f": {
                shortcut: ["C", "F"],
                global: true,
                usingInput: false,
                name: "Create a flashcard",
                description: "Create a new flashcard",
                action: () =>
                {
                    useModal().open(ModalFlashcardForm);
                }
            },
        }
    }, {
        section: "Modal",
        shortcuts: {
            escape: {
                shortcut: ["Esc"],
                global: true,
                usingInput: true,
                name: "Close current modal",
                description: "Close the current modal",
                action: () =>
                {
                    useModal().close();
                }
            },
        }
    },
];
