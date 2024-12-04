export const Regex = {
    Password: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
    Username: /^[\w\-.]*$/,
    Color: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
};
