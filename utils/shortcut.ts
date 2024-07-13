import { ModalFlashcardForm, ModalTopicForm, ModalUnitForm } from "#components";
import type { ShortcutSection } from "~/types/shortcut";

// Shortcuts must be unique to prevent bad behavior
export const AppShortcutSections: ShortcutSection[] = [
    {
        section: "Navigation",
        shortcuts: {
            "g-d": {
                shortcut: ["G", "D"],
                global: true,
                usingInput: false,
                name: "Go to personal dashboard",
                description: "Naviguate to your personal dashboard",
                action: () =>
                {
                    useModal().close();
                    navigateTo({
                        name: "dashboard"
                    });
                }
            },
            "g-c": {
                shortcut: ["G", "C"],
                global: true,
                usingInput: false,
                name: "Go to collection",
                description: "Naviguate to the collection page",
                action: () =>
                {
                    useModal().close();
                    navigateTo({
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
                action: () =>
                {
                    useModal().close();
                    navigateTo({
                        name: "practice"
                    });
                }
            },
            "g-f": {
                shortcut: ["G", "F"],
                global: true,
                usingInput: false,
                name: "Go to your favorite collection",
                description: "Naviguate to your favorite collection",
                action: () =>
                {
                    useModal().close();
                    navigateTo({
                        name: "favorites"
                    });
                }
            },
            "g-s": {
                shortcut: ["G", "S"],
                global: true,
                usingInput: false,
                name: "Go to settings",
                description: "Naviguate to the settings page",
                action: () =>
                {
                    useModal().close();
                    navigateTo({
                        name: "settings-account"
                    });
                }
            },
        }
    }, {
        section: "Common",
        shortcuts: {
            alt_t: {
                shortcut: ["Alt", "T"],
                global: true,
                usingInput: true,
                name: "Switch theme",
                description: "Switch to dark/light theme",
                action: () =>
                {
                    const currentTheme = useColorMode().value;
                    useColorMode().preference = currentTheme === "light" ? "dark" : "light";
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
                    useModal().close();
                    setTimeout(() => useModal().open(ModalTopicForm), 0);
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
                    useModal().close();
                    setTimeout(() => useModal().open(ModalUnitForm), 0);
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
                    useModal().close();
                    setTimeout(() => useModal().open(ModalFlashcardForm), 0);
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
