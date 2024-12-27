import { GradeType, type Grade } from "~/types/entity";

type GradeData = {
    color: string;
    label: string;
    icon: string;
};

export default (grade: Grade): GradeData =>
{
    switch (grade)
    {
        case GradeType.easy:
            return { color: "green", icon: "i-tabler-checks", label: "Easy" };
        case GradeType.good:
            return { color: "sky", icon: "i-tabler-circle-dashed-check", label: "Good" };
        case GradeType.hard:
            return { color: "yellow", icon: "i-tabler-brain", label: "Hard" };
        case GradeType.again:
            return { color: "red", icon: "i-tabler-reload", label: "Again" };
        default:
            return { color: "gray", icon: "i-tabler-help", label: "No data" };
    }
};
