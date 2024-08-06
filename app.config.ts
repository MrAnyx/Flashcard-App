export default defineAppConfig({
    ui: {
        primary: "sky",
        gray: "cool",
        input: {
            default: {
                size: "md"
            }
        },
        button: {
            default: {
                size: "md"
            }
        },
        // divider: {
        //     border: {
        //         base: "flex border-gray-200 dark:border-gray-700"
        //     }
        // },
        table: {
            td: {
                base: "max-w-[0] truncate"
            }
        },
        card: {
            // background: "bg-white dark:bg-gray-800",
            // shadow: "shadow",
            // ring: "ring-1 ring-gray-300 dark:ring-gray-700",
            // divide: "divide-y divide-gray-300 dark:divide-gray-700",
            body: {
                base: "overflow-auto"
            }
        }
    }
});
