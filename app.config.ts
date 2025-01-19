export default defineAppConfig({
    ui: {
        primary: "sky",
        gray: "cool",
        kbd: {
            padding: "px-1.5"
        },
        card: {
            header: {
                base: "c-text-primary"
            },
            body: {
                base: "c-text-primary"
            },
            footer: {
                base: "c-text-primary"
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
                base: "max-w-[0] truncate",
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
