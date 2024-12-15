export default defineAppConfig({
    ui: {
        primary: "sky",
        gray: "cool",
        kbd: {
            padding: "px-1.5"
        },
        button: {
            default: {
                size: "md",
                variant: "soft"
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
            td: {
                base: "max-w-[0] truncate"
            }
        },
        breadcrumb: {
            wrapper: "w-fit"
        },
        horizontalNavigation: {
            wrapper: "w-fit"
        }
    },
});
