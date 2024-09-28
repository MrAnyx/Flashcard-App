export default (grade: number) =>
{
    switch (grade)
    {
        case 4:
            return "green";
        case 3:
            return "sky";
        case 2:
            return "yellow";
        case 1:
            return "red";
        default:
            return "gray";
    }
};
