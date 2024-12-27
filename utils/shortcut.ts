import { ModalFlashcardForm, ModalSearchCommandPalette, ModalSessionIntroduction, ModalShortcuts, ModalTopicForm, ModalUnitForm } from "#components";
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
                usingInput: false,
                name: "Go to overview",
                description: "Naviguate to your personal overview",
                action: async () =>
                {
                    modal.close();
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
                    modal.close();
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
                    modal.close();
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
                    modal.close();
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
                    modal.open(ModalSearchCommandPalette);
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
                    modal.open(ModalShortcuts);
                }
            },
            "n-s": {
                shortcut: ["N", "S"],
                global: true,
                usingInput: false,
                name: "New session",
                description: "Start a practice session",
                action: async () =>
                {
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
            "n-t": {
                shortcut: ["N", "T"],
                global: true,
                usingInput: false,
                name: "New topic",
                description: "Create a new topic",
                action: () =>
                {
                    modal.open(ModalTopicForm);
                }
            },
            "n-u": {
                shortcut: ["N", "U"],
                global: true,
                usingInput: false,
                name: "New unit",
                description: "Create a new unit",
                action: () =>
                {
                    modal.open(ModalUnitForm);
                }
            },
            "n-f": {
                shortcut: ["N", "F"],
                global: true,
                usingInput: false,
                name: "New flashcard",
                description: "Create a new flashcard",
                action: () =>
                {
                    modal.open(ModalFlashcardForm);
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
                    modal.close();
                }
            },
        }
    },
];
