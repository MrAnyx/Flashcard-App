export default defineAppConfig({
    ui: {
        primary: "sky",
        gray: "cool",
        kbd: {
            padding: "px-1.5"
        },
        card: {
            header: {
                base: "c-text-primary",
                padding: "px-4 py-3 sm:py-4 sm:px-6"
            },
            body: {
                base: "c-text-primary",
            },
            footer: {
                base: "c-text-primary",
                padding: "px-4 py-3 sm:py-4 sm:px-6"
            }
        },
        button: {
            default: {
                size: "md",
            }
        },
        input: {
            default: {
                size: "md"
            }
        },
        select: {
            default: {
                size: "md"
            }
        },
        table: {
            th: {
                color: "c-text-primary",
            },
            td: {
                base: "max-w-[0] truncate text-sm",
                color: "c-text-secondary",
            }
        },
        breadcrumb: {
            wrapper: "w-fit",
        },
        horizontalNavigation: {
            wrapper: "w-fit"
        }
    },
});
