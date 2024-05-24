import type { Notification } from "#ui/types";
import type { StandardToastType } from "~/types/standardToast";

export function useStandardToast(type: StandardToastType, options?: Partial<Notification>) {
    const toast = useToast();

    // TODO Utiliser un switch
    if (type === "error") {
        toast.add({
            title: "Error",
            description: "An error occured. Please try again or contact an administrator.",
            color: "red",
            ...options
        });
    }
    else if (type === "warning") {
        toast.add({
            title: "Warning",
            color: "orange",
            ...options
        });
    }
    else if (type === "info") {
        toast.add({
            title: "Information",
            color: "primary",
            ...options
        });
    }
    else if (type === "success") {
        toast.add({
            title: "Success",
            color: "green",
            ...options
        });
    }
}
