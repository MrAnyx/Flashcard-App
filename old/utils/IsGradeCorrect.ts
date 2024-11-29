import { GradeType } from "~/types/entity";

export default (grade: number) =>
{
    return grade >= GradeType.hard;
};
